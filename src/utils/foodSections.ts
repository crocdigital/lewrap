import type { CollectionEntry } from "astro:content";
import foodCategoriesData from "../data/food-categories.json";

type FoodItem = CollectionEntry<"food">;

export interface FoodSubcategoryConfig {
    name?: string | null;
    subtitle?: string | null;
    description?: string | null;
}

export interface FoodCategoryConfig {
    name?: string | null;
    subtitle?: string | null;
    description?: string | null;
    heading_image?: string | null;
    subcategories?: FoodSubcategoryConfig[] | null;
}

export interface FoodSubcategorySection {
    name: string;
    subtitle: string;
    description: string;
    items: FoodItem[];
}

export interface FoodCategorySection {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    heading_image: string;
    subcategories: FoodSubcategorySection[];
    /** Items in this category that matched no subcategory (or have none). */
    looseItems: FoodItem[];
    /** True when the category has at least one item to show. */
    hasItems: boolean;
}

/** The raw, client-editable category list from src/data/food-categories.json. */
export const foodCategories: FoodCategoryConfig[] = Array.isArray(
    (foodCategoriesData as { categories?: unknown })?.categories,
)
    ? ((foodCategoriesData as { categories: FoodCategoryConfig[] }).categories)
    : [];

/** Trim + lowercase, for tolerant matching of category/subcategory names. */
function normalise(value: unknown): string {
    return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** Turn a category name into a section id, e.g. "Protein Packs" -> "protein-packs". */
export function slugifyCategory(value: unknown): string {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Normalise an item's `order` field. A number (or numeric string) sorts by value;
 * anything else - blank, text, null, missing - sorts last.
 */
function orderValue(value: unknown): number {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return Number.POSITIVE_INFINITY;
}

/** Sort by normalised order, then by name. */
function byOrderThenName(a: FoodItem, b: FoodItem): number {
    const orderA = orderValue((a.data as { order?: unknown }).order);
    const orderB = orderValue((b.data as { order?: unknown }).order);
    if (orderA !== orderB) return orderA < orderB ? -1 : 1;
    return String(a.data.name ?? "").localeCompare(String(b.data.name ?? ""));
}

/**
 * Resolve the editable category list against the food collection.
 *
 * Returns one entry per configured category, in array order, each carrying its
 * matched items already sorted. Also returns any available item whose category
 * is blank or matches no configured category, so the caller can warn about it.
 */
export function resolveFoodSections(allFood: FoodItem[]): {
    sections: FoodCategorySection[];
    unmatchedItems: FoodItem[];
} {
    const availableItems = allFood.filter((item) => item.data.available);

    const sections: FoodCategorySection[] = foodCategories.map((category) => {
        const name = String(category?.name ?? "").trim();
        const normalisedName = normalise(name);

        const categoryItems = normalisedName
            ? availableItems.filter(
                  (item) => normalise(item.data.category) === normalisedName,
              )
            : [];

        const configuredSubcategories = Array.isArray(category?.subcategories)
            ? category.subcategories.filter(Boolean)
            : [];

        const matchedSubcategoryNames = new Set<string>();
        const subcategories: FoodSubcategorySection[] = configuredSubcategories
            .map((subcategory) => {
                const subName = String(subcategory?.name ?? "").trim();
                const normalisedSubName = normalise(subName);
                if (normalisedSubName) {
                    matchedSubcategoryNames.add(normalisedSubName);
                }

                return {
                    name: subName,
                    subtitle: String(subcategory?.subtitle ?? "").trim(),
                    description: String(subcategory?.description ?? "").trim(),
                    items: normalisedSubName
                        ? categoryItems
                              .filter(
                                  (item) =>
                                      normalise(item.data.subcategory) ===
                                      normalisedSubName,
                              )
                              .sort(byOrderThenName)
                        : [],
                };
            })
            .filter((subcategory) => subcategory.items.length > 0);

        // Items whose subcategory is blank or matches none of the configured ones.
        const looseItems = (
            configuredSubcategories.length > 0
                ? categoryItems.filter(
                      (item) =>
                          !matchedSubcategoryNames.has(
                              normalise(item.data.subcategory),
                          ),
                  )
                : categoryItems
        ).sort(byOrderThenName);

        return {
            id: slugifyCategory(name),
            name,
            subtitle: String(category?.subtitle ?? "").trim(),
            description: String(category?.description ?? "").trim(),
            heading_image: String(category?.heading_image ?? "").trim(),
            subcategories,
            looseItems,
            hasItems:
                subcategories.length > 0 || looseItems.length > 0,
        };
    });

    const knownCategoryNames = new Set(
        foodCategories
            .map((category) => normalise(category?.name))
            .filter((name) => name !== ""),
    );

    const unmatchedItems = availableItems.filter(
        (item) => !knownCategoryNames.has(normalise(item.data.category)),
    );

    return { sections, unmatchedItems };
}

/** One build warning listing available items that no category claimed. */
export function warnAboutUnmatchedItems(unmatchedItems: FoodItem[]): void {
    if (unmatchedItems.length === 0) return;

    const details = unmatchedItems
        .map(
            (item) =>
                `${String(item.data.name ?? "").trim() || "(unnamed)"} [src/content/food/${item.id}]`,
        )
        .join(", ");

    console.warn(
        `[our-food] ${unmatchedItems.length} available food item(s) have a blank or unrecognised category and were not rendered. Fix the category in CloudCannon or add it to src/data/food-categories.json: ${details}`,
    );
}
