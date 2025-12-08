import Link from "next/link";

export default function OurFood() {
    return (
        <div className="bg-purple-600 text-white">
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-bold">Our Food</h1>
                <p className="text-xl">This is the Our Food dummy page.</p>
                <div className="flex gap-4">
                    <Link href="/" className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-opacity-90 transition">
                        Go Home
                    </Link>
                    <Link href="/nutrition" className="px-6 py-3 bg-purple-800 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
                        Go to Nutrition
                    </Link>
                </div>
            </div>
            <div className="h-[150vh] w-full flex items-center justify-center mt-20">
                <p className="text-purple-200">Keep scrolling to see the nav shrink...</p>
            </div>
        </div>
    );
}
