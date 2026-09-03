"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const techStack = {
    "Languages": [
        { name: "Python", level: "advanced" },
        { name: "C++", level: "advanced" },
        { name: "SQL", level: "advanced" },
        { name: "Go", level: "intermediate" },
        { name: "JavaScript", level: "intermediate" },
    ],
    "Backend & ML": [
        { name: "FastAPI", level: "advanced" },
        { name: "Flask", level: "advanced" },
        { name: "Temporal", level: "intermediate" },
        { name: "SQLAlchemy", level: "advanced" },
        { name: "PyTorch", level: "intermediate" },
        { name: "NumPy", level: "advanced" },
        { name: "React", level: "intermediate" },
        { name: "Vue", level: "intermediate" },
    ],
    "Cloud & Databases": [
        { name: "AWS", level: "advanced" },
        { name: "Google Cloud", level: "advanced" },
        { name: "PostgreSQL", level: "advanced" },
        { name: "Redis", level: "intermediate" },
        { name: "Supabase", level: "advanced" },
        { name: "Firebase", level: "advanced" },
        { name: "MongoDB", level: "intermediate" },
    ],
    "Infrastructure": [
        { name: "Docker", level: "advanced" },
        { name: "Kubernetes", level: "intermediate" },
        { name: "Helm", level: "intermediate" },
        { name: "GitHub Actions", level: "intermediate" },
        { name: "Prometheus", level: "intermediate" },
        { name: "Grafana", level: "intermediate" },
        { name: "Linux", level: "advanced" },
        { name: "Git", level: "advanced" },
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
                                {items.map((item) => (
                                    <div
                                        key={item.name}
                                        className={cn(
                                            "px-3 py-2 rounded-lg border font-mono text-xs font-medium",
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
            </div>
        </section>
    );
}