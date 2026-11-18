import { clean } from "./content";

export function generateLocationSchema(location: any, siteUrl: string) {
    // Every string field may arrive as null (cleared in CloudCannon), "" or
    // missing. clean() turns all three into undefined, and JSON.stringify drops
    // undefined keys, so a blank field leaves the property out of the schema
    // rather than emitting null or "".
    const name = clean(location?.data?.name);
    const image = clean(location?.data?.image);

    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": name,
        // new URL(null, siteUrl) would resolve to "<site>/null", so only a real
        // image gets an absolute URL.
        "image": image ? new URL(image, siteUrl).href : undefined,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": clean(location?.data?.address),
            "addressLocality": clean(location?.data?.suburb),
            "addressRegion": clean(location?.data?.state),
            "postalCode": clean(location?.data?.postcode),
            "addressCountry": "AU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": location.data.latitude,
            "longitude": location.data.longitude
        },
        "telephone": clean(location?.data?.phone),
        "email": clean(location?.data?.email),
        "url": new URL(`/locations/${location.slug}`, siteUrl).href,
        "priceRange": "$$",
        "servesCuisine": "Fast Food, Healthy Food",
        "openingHoursSpecification": location.data.hours ? [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Monday",
                "opens": location.data.hours.monday?.split(' - ')[0],
                "closes": location.data.hours.monday?.split(' - ')[1]
            },
            // ... repeat for other days
        ] : undefined
    };
}
