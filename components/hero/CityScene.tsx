"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import type { CityView, mountCity } from "./scene";

type Engine = ReturnType<typeof mountCity>;

export default function CityScene() {
    const host = useRef<HTMLDivElement>(null);
    const engine = useRef<Engine | null>(null);
    const { resolvedTheme } = useTheme();
    const [view, setView] = useState<CityView>("isometric");
    const [paused, setPaused] = useState(false);
    const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
    const theme = useRef(resolvedTheme);
    const pausedRef = useRef(paused);

    useEffect(() => {
        let cancelled = false;
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncMotion = () => { setPaused(preference.matches); pausedRef.current = preference.matches; engine.current?.setPaused(preference.matches); };
        syncMotion();
        preference.addEventListener("change", syncMotion);
        import("./scene").then(({ mountCity }) => {
            if (cancelled || !host.current) return;
            try {
                engine.current = mountCity(host.current, () => setStatus("unavailable"));
                engine.current.setTheme(theme.current === "dark");
                engine.current.setPaused(pausedRef.current);
                setStatus("ready");
            } catch {
                setStatus("unavailable");
            }
        }).catch(() => { if (!cancelled) setStatus("unavailable"); });
        return () => { cancelled = true; preference.removeEventListener("change", syncMotion); engine.current?.dispose(); engine.current = null; };
    }, []);

    useEffect(() => { theme.current = resolvedTheme; engine.current?.setTheme(resolvedTheme === "dark"); }, [resolvedTheme]);
    useEffect(() => { pausedRef.current = paused; engine.current?.setPaused(paused); }, [paused]);
    const changeView = (next: CityView) => { setView(next); engine.current?.setView(next); };
    const button = "inline-flex min-h-11 rounded-lg items-center justify-center gap-2 px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 disabled:opacity-40";

    return (
        <figure className="relative m-0 flex h-full min-h-[420px] flex-col" aria-label="Interactive miniature city with animated traffic and three drones">
            <div className="flex items-center justify-between gap-3 px-5 pt-5 lg:px-8" role="group" aria-label="City camera view">
                <div className="flex gap-1 rounded-xl border border-slate-300 p-1 dark:border-slate-600">
                    {(["isometric", "overhead"] as const).map(option => (
                        <button key={option} type="button" disabled={status !== "ready"} aria-pressed={view === option} onClick={() => changeView(option)} className={`${button} ${view === option ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`}>
                            {option === "isometric" ? "Isometric" : "Top-down"}
                        </button>
                    ))}
                </div>
                <span className="hidden sm:block text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400">MUCEDS / CITY STUDY</span>
            </div>
            <div className="relative min-h-0 flex-1">
                <div ref={host} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
                {status !== "ready" && <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-base text-slate-600 dark:text-slate-300" role="status">
                    {status === "loading" ? "Preparing the city…" : <p>The interactive city is unavailable in this browser.<br /><a className="mt-3 inline-block underline underline-offset-4" href="/research#muceds">Explore the UAV research</a></p>}
                </div>}
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 lg:px-8">
                <div>
                    <a href="/research#muceds" className="text-sm font-medium text-slate-800 dark:text-slate-200 underline underline-offset-4">UAV edge computing</a>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Illustrative simulation · Drag to orbit</p>
                </div>
                <div className="flex items-center" role="group" aria-label="Animation controls">
                    <button type="button" disabled={status !== "ready"} className={button} onClick={() => setPaused(value => !value)} aria-label={paused ? "Play city animation" : "Pause city animation"}>{paused ? <Play size={16} /> : <Pause size={16} />}<span>{paused ? "Play" : "Pause"}</span></button>
                    <button type="button" disabled={status !== "ready"} className={button} onClick={() => { setView("isometric"); engine.current?.rotate(); }} aria-label="Rotate city camera"><RotateCw size={16} /><span className="hidden sm:inline">Rotate</span></button>
                    <button type="button" disabled={status !== "ready"} className={button} onClick={() => changeView("isometric")} aria-label="Reset city camera"><RotateCcw size={16} /><span className="hidden sm:inline">Reset</span></button>
                </div>
            </figcaption>
        </figure>
    );
}
