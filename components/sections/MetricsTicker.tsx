"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Metric {
    value: string;
    label: string;
    project: string;
    icon: React.ReactNode;
}

const metrics: Metric[] = [
    {
        value: "98.3%",
        label: "Processing Time Reduction",
        project: "GRIG Technologies",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        value: "95%",
        label: "Network Usage Reduction",
        project: "Fog Computing / GVMP",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
    },
    {
        value: "99.77%",
        label: "NER F1-Score",
        project: "LOKI Voice Assistant",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
    },
    {
        value: "~90%",
        label: "Cache Hit Ratio",
        project: "UAV / MUCEDS",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
    },
    {
        value: "81,000+",
        label: "Locations Validated",
        project: "TerraQuest",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
    return (
        <motion.div
            className="flex-shrink-0 flex items-center gap-6 px-8 py-4 mx-4 rounded-xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400">
                {metric.icon}
            </div>
            <div className="flex flex-col">
                <span className="font-mono text-2xl md:text-3xl font-bold text-cyan-400">
                    {metric.value}
                </span>
                <span className="text-sm text-slate-400">{metric.label}</span>
                <span className="text-xs text-slate-600 font-mono">{metric.project}</span>
            </div>
        </motion.div>
    );
}

interface MetricsTickerProps {
    className?: string;
}

export function MetricsTicker({ className }: MetricsTickerProps) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className={cn("relative py-12 overflow-hidden", className)}>
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-px bg-cyan-500/50" />
                    <span className="font-mono text-sm text-cyan-400 uppercase tracking-wider">
                        Proof of Impact
                    </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                    Research & Engineering Metrics
                </h2>
            </div>

            {/* Gradient Overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F14] to-transparent z-10 pointer-events-none" />

            {/* Ticker Container */}
            <div
                ref={containerRef}
                className="relative flex"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex"
                    animate={{
                        x: [0, -1920],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    style={{
                        animationPlayState: isHovered ? "paused" : "running",
                    }}
                >
                    {/* First set of metrics */}
                    {metrics.map((metric, index) => (
                        <MetricCard key={`first-${index}`} metric={metric} index={index} />
                    ))}
                    {/* Duplicate for seamless loop */}
                    {metrics.map((metric, index) => (
                        <MetricCard key={`second-${index}`} metric={metric} index={index} />
                    ))}
                    {/* Triple for wider screens */}
                    {metrics.map((metric, index) => (
                        <MetricCard key={`third-${index}`} metric={metric} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Bottom border accent */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
        </section>
    );
}

// Static version for above-the-fold or non-animated contexts
export function MetricsGrid({ className }: { className?: string }) {
    return (
        <section className={cn("py-16", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-px bg-cyan-500/50" />
                    <span className="font-mono text-sm text-cyan-400 uppercase tracking-wider">
                        Key Metrics
                    </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8">
                    Research & Engineering Impact
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                    {metric.icon}
                                </div>
                                <div className="flex-1">
                                    <span className="font-mono text-3xl font-bold text-cyan-400">
                                        {metric.value}
                                    </span>
                                    <p className="text-sm text-slate-400 mt-1">{metric.label}</p>
                                    <p className="text-xs text-slate-600 font-mono mt-2">
                                        {metric.project}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
