import { defineCollection, z } from 'astro:content';

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

const foodCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        price: z.string(),
        description: z.string(),
        kj: z.number(),
        image: z.string(),
        orderLink: z.string().optional(),
        category: z.enum(['Wraps', 'Plates', 'Baguettes', 'Protein Packs', 'Salads', 'Kids Meals', 'Sides', 'Drinks']),
        featured: z.boolean().default(false),
        available: z.boolean().default(true),
    }),
});

export const collections = {
    locations: locationsCollection,
    food: foodCollection,
};