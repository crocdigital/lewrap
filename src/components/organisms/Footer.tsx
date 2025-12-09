"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();
    return (
        <footer className="px-10 py-20 flex flex-col gap-y-10 bg-black text-white">
            <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-6 gap-y-8 md:gap-x-4 mx-auto">
                <div className="col-span-2 md:col-span-1">
                    <Link href="/">
                        <Image
                            src="/brand/lewrap.svg"
                            alt="LeWrap"
                            className="mx-auto md:mx-0"
                            width={157}
                            height={46}
                        />
                    </Link>
                    <h2 className="text-2xl font-bold text-center md:text-left">I am Footer.</h2>
                </div>

                <div className="col-span-2">
                    <h3 className="text-4xl md:text-5xl opacity-30 text-center md:text-left md:-mt-1">Fresh, high quality, delicious meals without the wait.</h3>
                </div>

                <div className="col-span-1 hidden md:block">
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "font-bold opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Order now
                    </Link>
                    <Link
                        href="/locations"
                        className={`${pathname === "/locations" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Locations
                    </Link>
                    <Link
                        href="/our-food"
                        className={`${pathname === "/our-food" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Our food
                    </Link>
                    <Link
                        href="/nutrition"
                        className={`${pathname === "/nutrition" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Nutrition
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Catering
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        FAQs
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        LeWrap story
                    </Link>
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "font-bold opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Own a store
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Community
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Newsroom
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Work with us
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Contact LeWrap
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Terms &amp; conditions
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "opacity-70 hover:opacity-100"} duration-200`}
                    >
                        Policies
                    </Link>
                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-between text-center md:text-left text-xs text-gray-500">
                <p>&copy; 2025 Retail Systems Group Ltd. All rights reserved.</p>
                <p>Made with luv by Croc Digital</p>
            </div>
        </footer>
    );
}