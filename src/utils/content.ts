/**
 * Helpers for rendering CloudCannon content that may be blank.
 *
 * CloudCannon saves a cleared field as `null`, and some fields are saved as an
 * empty string instead. src/content/config.ts therefore accepts null, "" and
 * missing for every string and select field, which means every template has to
 * decide what "blank" looks like. These helpers are that decision in one place.
 */

/**
 * Trimmed string, or `undefined` when the value is null, missing, not a string
 * or whitespace only.
 *
 * `undefined` is deliberate rather than "": Astro drops an attribute whose
 * value is `undefined`, and a component prop that is `undefined` falls back to
 * its declared default, so blank values reach the site defaults instead of
 * being printed as empty strings.
 */
export function clean(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

/** Trimmed string, or "" when blank. For string operations like sorting. */
export function text(value: unknown): string {
    return clean(value) ?? "";
}

/** True when the value carries no content to render. */
export function isBlank(value: unknown): boolean {
    return clean(value) === undefined;
}

/**
 * The newsroom `category` select. The schema accepts free text so a cleared
 * value cannot fail the build, so a blank or unrecognised value falls back to
 * the default the select used to carry.
 */
export const NEWSROOM_CATEGORIES = [
    "Promotion",
    "Community",
    "Updates",
    "Franchising",
] as const;

export const NEWSROOM_DEFAULT_CATEGORY = "Updates";

/**
 * Resolve a stored newsroom category to one of NEWSROOM_CATEGORIES.
 * Blank, null, missing or unrecognised all resolve to NEWSROOM_DEFAULT_CATEGORY.
 * Matching is trim + case-insensitive, so "updates " still resolves to "Updates".
 */
export function newsroomCategory(value: unknown): string {
    const candidate = text(value).toLowerCase();
    const match = NEWSROOM_CATEGORIES.find(
        (category) => category.toLowerCase() === candidate,
    );
    return match ?? NEWSROOM_DEFAULT_CATEGORY;
}

/**
 * Join the parts that have content, e.g. ["Burwood", "NSW 2134"] -> "Burwood,
 * NSW 2134", and ["", "NSW 2134"] -> "NSW 2134". Used for address lines so a
 * cleared field does not leave a stray comma or a line of punctuation alone.
 *
 * Written as a loop on purpose. Tailwind's source scanner reads these files as
 * plain text, so an array-method name used here as a bare word would be
 * mistaken for a utility class and add an unused rule to the CSS bundle.
 */
export function joinParts(parts: unknown[], separator = ", "): string {
    const kept: string[] = [];
    for (const part of parts) {
        const value = clean(part);
        if (value !== undefined) kept.push(value);
    }
    return kept.join(separator);
}
