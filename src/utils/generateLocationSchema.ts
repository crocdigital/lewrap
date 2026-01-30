export function generateLocationSchema(location: any, siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": location.data.name,
        "image": new URL(location.data.image, siteUrl).href,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": location.data.address,
            "addressLocality": location.data.suburb,
            "addressRegion": location.data.state,
            "postalCode": location.data.postcode,
            "addressCountry": "AU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": location.data.latitude,
            "longitude": location.data.longitude
        },
        "telephone": location.data.phone || undefined,
        "email": location.data.email || undefined,
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