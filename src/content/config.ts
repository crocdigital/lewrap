import { defineCollection, z } from 'astro:content';

// CloudCannon writes a cleared field as `null`, not as a missing key and not as
// an empty string. Zod's .optional() only accepts `undefined`, so every string
// field below is .optional().nullable() - that covers null, missing and "".
// Templates are responsible for treating null / "" as "no value" and omitting
// the element rather than printing it.
//
// Select fields are typed as plain strings rather than z.enum() for the same
// reason: a cleared select arrives as null and an enum would fail the build.
// The allowed values stay documented in cloudcannon.config.yml, and the
// templates fall back to the documented default for a blank or unrecognised
// value.

{/* Locations */ }
const locationsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        suburb: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        postcode: z.string().optional().nullable(),
        latitude: z.number(),
        longitude: z.number(),
        phone: z.string().optional().nullable(),
        email: z.string().email().or(z.literal('')).optional().nullable(),
        hours: z.object({
            monday: z.string(),
            tuesday: z.string(),
            wednesday: z.string(),
            thursday: z.string(),
            friday: z.string(),
            saturday: z.string(),
            sunday: z.string(),
        }),
        image: z.string().optional().nullable(),
        order_now_link: z.string().optional().nullable(),
        featured: z.boolean().default(false),
        seo_title: z.string().optional().nullable(),
        seo_description: z.string().optional().nullable(),
        seo_image: z.string().optional().nullable(),
        seo_keywords: z.string().optional().nullable(),
        seo_robots: z.string().optional().nullable(),
    }),
});

{/* Food items */ }
const foodCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string().optional().nullable(),
        price: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        kj: z.number(),
        image: z.string().optional().nullable(),
        orderLink: z.string().optional().nullable(),
        // Category/subcategory names are free text, matched (trim +
        // case-insensitive) against src/data/food-categories.json at build time.
        // A blank or unrecognised value never fails the build - the item is
        // skipped and logged as a single build warning instead.
        category: z.string().optional().nullable(),
        subcategory: z.string().optional().nullable(),
        // Lower numbers show first within the category. Anything non-numeric
        // (blank, text, null, missing) sorts last.
        order: z.union([z.number(), z.string(), z.null()]).optional(),
        available: z.boolean().default(true),
    }),
});

{/* FAQ items */ }
const faqCollection = defineCollection({
    type: 'content',
    schema: z.object({
        question: z.string().optional().nullable(),
        answer: z.string().optional().nullable(),
        // Select in CloudCannon: General | Catering | Franchising. Free text
        // here so a cleared or renamed value cannot fail the build; an FAQ
        // whose category matches no section simply is not rendered.
        category: z.string().optional().nullable(),
        featured: z.boolean().default(false),
        order: z.number().default(0),
    }),
});

{/* Newsroom articles */ }
const newsroomCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional().nullable(),
        hero_image: z.string().optional().nullable(),
        hero_image_mobile: z.string().optional().nullable(),
        // Select in CloudCannon: Promotion | Community | Updates | Franchising.
        // Free text here so a cleared value cannot fail the build; the
        // templates fall back to NEWSROOM_DEFAULT_CATEGORY ("Updates") for a
        // blank or unrecognised value.
        category: z.string().optional().nullable(),
        date: z.date(),
        preview_text: z.string().optional().nullable(),
        featured: z.boolean().default(false),
        seo_title: z.string().optional().nullable(),
        seo_description: z.string().optional().nullable(),
        seo_image: z.string().optional().nullable(),
        seo_keywords: z.string().optional().nullable(),
        seo_robots: z.string().optional().nullable(),
        seo_canonical: z.string().optional().nullable(),
    }),
});

{/* Popups */ }
const popupsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        // Select in CloudCannon: newsletter_modal | franchise_enquiry. Free
        // text here so a cleared value cannot fail the build; the popup is not
        // rendered at all when this is blank, because it is the DOM id the
        // open/close handlers are bound to.
        popup_id: z.string().optional().nullable(),
        title: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        image: z.string().optional().nullable(),
        image_position: z.string().optional().nullable(), // CSS classes for positioning
        show_on_load: z.boolean().default(false),
        remember_close: z.boolean().default(false),
    }),
});

{/* Landing Page (one for now) */ }
const landingPagesCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        image: z.string().optional().nullable(),
        keywords: z.string().optional().nullable(),
        robots: z.string().optional().nullable(),
        canonical: z.string().optional().nullable(),
        page_blocks: z.array(z.any()).optional().nullable(),
    }),
});

export const collections = {
    locations: locationsCollection,
    food: foodCollection,
    faq: faqCollection,
    newsroom: newsroomCollection,
    popups: popupsCollection,
    "landing-pages": landingPagesCollection,
};
