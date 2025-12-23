import Link from "next/link";

export default function Nutrition() {
    return (
        <main className="bg-emerald-600 text-white">
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-bold">Nutrition</h1>
                <p className="text-xl">This is the Nutrition dummy page.</p>
                <div className="flex gap-4">
                    <Link href="/our-food" className="px-6 py-3 bg-emerald-800 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
                        Go to Our Food
                    </Link>
                    <Link href="/locations" className="px-6 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-opacity-90 transition">
                        Go to Locations
                    </Link>
                </div>
            </div>
            <div className="h-[150vh] w-full flex items-center justify-center mt-20">
                <p className="text-emerald-200">Keep scrolling to see the nav shrink...</p>
            </div>
        </main>
    );
}
