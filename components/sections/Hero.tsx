"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CityScene = dynamic(() => import("@/components/hero/CityScene"), {
    ssr: false,
    loading: () => <div className="flex h-full min-h-[420px] items-center justify-center text-sm text-slate-500" role="status">Preparing the city…</div>,
});

export function Hero() {
    return (
        <section aria-labelledby="hero-title" className="relative overflow-hidden bg-background pt-20 text-slate-900 dark:text-slate-100">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
            <div className="relative mx-auto grid max-w-[1600px] lg:min-h-[720px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:min-h-[780px]">
                <div className="relative z-10 flex flex-col justify-center px-6 pb-12 pt-12 sm:px-10 lg:py-20 lg:pl-12 lg:pr-4 xl:pl-16">
                    <p className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-slate-600 dark:text-slate-400">
                        <span className="h-2 w-2 bg-orange-500" aria-hidden="true" />
                        BACKEND ENGINEERING / APPLIED AI
                    </p>
                    <h1 id="hero-title" className="text-[clamp(3.25rem,6.2vw,6.25rem)] font-semibold leading-[1.04] tracking-[-0.055em]">Rudra Garg<span className="text-orange-500">.</span></h1>
                    <p className="mt-6 max-w-lg text-2xl leading-snug tracking-tight sm:text-3xl">Backend systems.<br />Infrastructure. Applied AI.</p>
                    <p className="mt-6 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
                        I build services in Python and Go, from notification workflows and multiplayer backends to local AI and edge computing research.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link href="/engineering" className="inline-flex min-h-12 rounded-lg items-center gap-3 bg-orange-500 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">Engineering Work<ArrowUpRight size={18} aria-hidden="true" /></Link>
                        <a href="/resume" className="inline-flex min-h-12 rounded-lg items-center gap-3 border border-slate-400 px-5 py-3 font-medium transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 dark:border-slate-500 dark:hover:bg-slate-800">Resume<ArrowUpRight size={18} aria-hidden="true" /></a>
                    </div>
                    <p className="mt-10 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">IIIT Guwahati ’26<br />Former Backend Developer Intern at GRIG</p>
                </div>
                <div className="relative h-[520px] min-w-0 sm:h-[600px] lg:h-auto">
                    <CityScene />
                </div>
            </div>
        </section>
    );
}
