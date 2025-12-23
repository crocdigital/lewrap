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
                    <h3 className="font-cocogoose text-4xl md:text-5xl opacity-30 text-center md:text-left -mt-1">Fresh, high quality, delicious meals without the wait.</h3>
                </div>

                <div className="col-span-1 hidden md:block">
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "font-bold text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Order now
                    </Link>
                    <Link
                        href="/locations"
                        className={`${pathname === "/locations" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Locations
                    </Link>
                    <Link
                        href="/our-food"
                        className={`${pathname === "/our-food" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Our food
                    </Link>
                    <Link
                        href="/nutrition"
                        className={`${pathname === "/nutrition" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Nutrition
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Catering
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        FAQs
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Our story
                    </Link>
                </div>

                <div className="col-span-1 flex flex-col gap-y-2">
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "font-bold text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Own a store
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Community
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Newsroom
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Work with us
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Contact LeWrap
                    </Link>
                    <Link
                        href="#"
                        className={`${pathname === "#" ? "text-white pointer-events-none" : "text-neutral-400 hover:text-white"} duration-200`}
                    >
                        Policies
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-center gap-y-1 md:text-left text-xs text-neutral-400">
                <p>&copy; {new Date().getFullYear()} Retail Systems Group Ltd. All rights reserved.</p>
                <p className="flex items-center gap-x-1 mx-auto md:mx-0">
                    Made with{" "}
                    <svg width="12" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.85979 0C2.86643 0 1.87312 0.389074 1.12359 1.17349C-0.375497 2.74228 -0.373564 5.25615 1.12359 6.82599L6.84579 12.827C6.89788 12.8817 6.96052 12.9252 7.02992 12.9549C7.09933 12.9847 7.17404 13 7.24954 13C7.32504 13 7.39976 12.9847 7.46916 12.9549C7.53856 12.9252 7.60121 12.8817 7.6533 12.827C9.56213 10.8294 11.4724 8.82946 13.3813 6.83179C14.8804 5.26297 14.8804 2.74812 13.3813 1.1793C11.8822 -0.38952 9.40798 -0.389553 7.90891 1.1793L7.25244 1.85899L6.596 1.17349C5.84645 0.389077 4.85314 0 3.85979 0ZM3.85979 1.09216C4.55321 1.09216 5.25133 1.3779 5.79431 1.94613L6.85161 3.05572C6.9037 3.11037 6.96634 3.15388 7.03574 3.18361C7.10514 3.21334 7.17985 3.22866 7.25535 3.22866C7.33085 3.22866 7.40556 3.21334 7.47497 3.18361C7.54437 3.15388 7.60701 3.11037 7.6591 3.05572L8.7106 1.95194C9.79653 0.815454 11.4879 0.81548 12.5738 1.95194C13.6597 3.0884 13.6597 4.9285 12.5738 6.06496C10.8003 7.92101 9.02596 9.77427 7.25244 11.6303L1.93108 6.05916C0.845729 4.9211 0.845153 3.08256 1.93108 1.94613C2.47404 1.3779 3.16636 1.09216 3.85979 1.09216Z" fill="#909090" />
                    </svg>
                    {" "}by <Link href="https://crocdigital.com.au" target="_blank" className="text-white">Croc Digital</Link>
                </p>
            </div>
        </footer>
    );
}