import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-10 bg-black text-white">
            <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-6 gap-y-8 md:gap-x-4 py-20 mx-auto">
                <div className="col-span-1">
                    <Link href="/">
                        <Image src="/brand/lewrap.svg" alt="LeWrap" width={157} height={46} />
                    </Link>
                    <h2 className="text-2xl font-bold">I am Footer.</h2>
                </div>

                <div className="col-span-2">
                    <h3 className="text-5xl opacity-30 -mt-1">Fresh, high quality, delicious meals without the wait.</h3>
                </div>

                <div className="col-span-1 hidden md:block">
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link className="opacity-70 hover:opacity-100 transition duration-200" href="#">Order now</Link>
                    <Link href="#">Our food</Link>
                    <Link href="#">Nutrition</Link>
                    <Link href="#">Locations</Link>
                    <Link href="#">Catering</Link>
                    <Link href="#">FAQs</Link>
                    <Link href="#">LeWrap story</Link>
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link href="#">Own a store</Link>
                    <Link href="#">Community</Link>
                    <Link href="#">Newsroom</Link>
                    <Link href="#">Work with us</Link>
                    <Link href="#">Contact LeWrap</Link>
                    <Link href="#">Terms &amp; conditions</Link>
                    <Link href="#">Policies</Link>
                </div>
            </div>
        </footer>
    );
}