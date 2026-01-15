"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FlaskConical, Wrench, ArrowRight } from "lucide-react";

const sections = [
    {
        title: "Research Labs",
        description:
            "Academic research projects in distributed systems, fog computing, UAV networks, and AI/ML. Backed by rigorous simulations and technical reports.",
        href: "/research",
        icon: FlaskConical,
        color: "cyan",
        projects: [
            { name: "MUCEDS", tag: "UAV Edge Networks" },
            { name: "GVMP", tag: "Fog Computing" },
            { name: "LOKI", tag: "Voice NLU" },
        ],
    },
    {
        title: "Engineering",
        description:
            "Production-grade applications built for scale. Real-time systems, multiplayer games, and backend optimizations.",
        href: "/engineering",
        icon: Wrench,
        color: "violet",
        projects: [
            { name: "Portal Gambit", tag: "Real-time Chess" },
            { name: "TerraQuest", tag: "Geo-guesser" },
            { name: "GRIG", tag: "Backend Optimization" },
        ],
    },
];

export function SectionPreview() {
    return (
        <section className="py-24 relative">
            {/* Background accent */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-sm text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                            Explore
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                            Two Sides of the Stack
                        </h2>
                        <p className="text-slate-600 dark:text-slate-500 mt-4 max-w-2xl mx-auto">
                            From academic research and simulations to production-ready
                            engineering. Different disciplines, unified by systems thinking.
                        </p>
                    </motion.div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={section.href} className="group block h-full">
                                <div
                                    className={cn(
                                        "relative h-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50",
                                        "hover:border-cyan-500/40 transition-all duration-300",
                                        "overflow-hidden shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none"
                                    )}
                                >
                                    {/* Gradient overlay on hover */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                            section.color === "cyan"
                                                ? "bg-gradient-to-br from-cyan-500/5 to-transparent"
                                                : "bg-gradient-to-br from-violet-500/5 to-transparent"
                                        )}
                                    />

                                    {/* Content */}
                                    <div className="relative">
                                        {/* Icon + Title */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                                    section.color === "cyan"
                                                        ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400"
                                                        : "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                                                )}
                                            >
                                                <section.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                                {section.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 dark:text-slate-400 mb-6">{section.description}</p>

                                        {/* Projects */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {section.projects.map((project) => (
                                                <div
                                                    key={project.name}
                                                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                                                >
                                                    <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                                                        {project.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500 ml-2">
                                                        {project.tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 font-medium",
                                                section.color === "cyan"
                                                    ? "text-cyan-700 dark:text-cyan-400"
                                                    : "text-violet-700 dark:text-violet-400"
                                            )}
                                        >
                                            <span>Explore {section.title}</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}