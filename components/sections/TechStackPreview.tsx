"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const techStack = {
    Infrastructure: [
        { name: "Docker", level: "advanced" },
        { name: "Kubernetes", level: "intermediate" },
        { name: "Linux TC", level: "advanced" },
        { name: "Prometheus", level: "intermediate" },
    ],
    Backend: [
        { name: "Go (Gin)", level: "advanced" },
        { name: "Python", level: "advanced" },
        { name: "FastAPI", level: "advanced" },
        { name: "PostgreSQL", level: "intermediate" },
    ],
    "AI/Research": [
        { name: "PyTorch", level: "advanced" },
        { name: "SUMO", level: "intermediate" },
        { name: "Rasa NLU", level: "advanced" },
        { name: "LSTM/RL", level: "intermediate" },
    ],
    Frontend: [
        { name: "Next.js", level: "advanced" },
        { name: "React", level: "advanced" },
        { name: "Tailwind", level: "advanced" },
        { name: "Framer", level: "intermediate" },
    ],
};

const levelColors = {
    advanced: "text-sky-700 dark:text-cyan-400 border-sky-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-cyan-500/10",
    intermediate: "text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600/30 bg-slate-50 dark:bg-slate-700/30",
};

export function TechStackPreview() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-px bg-sky-600 dark:bg-cyan-500/50" />
                        <span className="font-mono text-sm text-sky-700 dark:text-cyan-400 uppercase tracking-wider">
                            Technical Arsenal
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                        Stack Overview
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(techStack).map(([category, items], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="p-6 rounded-xl liquid-glass shadow-md hover:shadow-lg transition-shadow dark:shadow-none"
                        >
                            <h3 className="font-mono text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-4">
                                {category}
                            </h3>
                            <div className="space-y-2">
                                {items.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className={cn(
                                            "px-3 py-2 rounded-lg border font-mono text-sm",
                                            levelColors[item.level as keyof typeof levelColors]
                                        )}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-sky-100 dark:bg-cyan-500/20 border border-sky-300 dark:border-cyan-500/30" />
                        <span>Advanced</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-700/30 border border-slate-300 dark:border-slate-600/30" />
                        <span>Intermediate</span>
                    </div>
                </div>
            </div>
        </section>
    );
}