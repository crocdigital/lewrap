import { defineCollection, z } from 'astro:content';

{/* Locations */ }
const locationsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        address: z.string(),
        suburb: z.string(),
        state: z.string(),
        postcode: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        hours: z.object({
            monday: z.string(),
            tuesday: z.string(),
            wednesday: z.string(),
            thursday: z.string(),
            friday: z.string(),
            saturday: z.string(),
            sunday: z.string(),
        }),
        image: z.string(),
        order_now_link: z.string().optional(),
        featured: z.boolean().default(false),
    }),
});

{/* Food items */ }
const foodCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        price: z.string(),
        description: z.string().optional(),
        kj: z.number(),
        image: z.string(),
        orderLink: z.string().optional(),
        category: z.enum(['Wraps', 'Plates', 'Baguettes', 'Protein Packs', 'Salads', 'Kids Meals', 'Sides', 'Drinks']),
        subcategory: z.string().optional(),  // ← Added
        available: z.boolean().default(true),
    }),
});

{/* FAQ items */ }
const faqCollection = defineCollection({
    type: 'content',
    schema: z.object({
        question: z.string(),
        answer: z.string(),
        category: z.enum(['General', 'Catering', 'Franchising']),
        featured: z.boolean().default(false),
        order: z.number().default(0),
    }),
});

{/* Newsroom articles */ }
const newsroomCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        hero_image: z.string(),
        category: z.enum(['General', 'Franchising', 'Promotion', 'Community', 'Updates']),
        date: z.date(),
        preview_text: z.string(),
        featured: z.boolean().default(false),
    }),
});

export const collections = {
    locations: locationsCollection,
    food: foodCollection,
    faq: faqCollection,
    newsroom: newsroomCollection,
};