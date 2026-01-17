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
        email: z.string().email().optional(),
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

export const collections = {
    locations: locationsCollection,
};