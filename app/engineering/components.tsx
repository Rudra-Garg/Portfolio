"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Wrench,
    Gamepad2,
    Globe,
    Zap,
    ChevronRight,
    ExternalLink,
    Github,
    Play,
    FileCode,
} from "lucide-react";

export function EngineeringHero() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent dark:from-violet-500/5 dark:via-transparent dark:to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <a href="/" className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors">
                            Home
                        </a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-violet-700 dark:text-violet-400 font-medium">Engineering</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-transparent">
                            <Wrench className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
                                Engineering
                            </h1>
                            <p className="text-slate-500 font-mono text-sm mt-1">
                                /products/shipped
                            </p>
                        </div>
                    </div>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-12">
                        Production-grade applications built for scale. Real-time systems,
                        multiplayer games, and backend optimizations with measurable impact.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Gamepad2,
                                label: "Real-time Gaming",
                                desc: "WebSocket, WebRTC, Game State",
                            },
                            {
                                icon: Globe,
                                label: "Web Applications",
                                desc: "Full-stack, APIs, Databases",
                            },
                            {
                                icon: Zap,
                                label: "Performance",
                                desc: "Optimization, Caching, Async",
                            },
                        ].map((area, index) => (
                            <motion.div
                                key={area.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm dark:shadow-none"
                            >
                                <div className="flex items-center gap-3">
                                    <area.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-slate-200">{area.label}</p>
                                        <p className="text-sm text-slate-500">{area.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

interface ProjectBentoProps {
    project: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        features: string[];
        techStack: { name: string; category: string }[];
        metrics: { label: string; value: string }[];
        color: string;
        links: { demo?: string; github?: string; case_study?: string };
        image: string;
    };
    index: number;
    reverse?: boolean;
}

export function ProjectBento({ project, index, reverse }: ProjectBentoProps) {
    const colorClasses = {
        orange: {
            border: "border-orange-200 dark:border-orange-500/30",
            bg: "bg-orange-50 dark:bg-orange-500/5",
            text: "text-orange-600 dark:text-orange-400",
            icon: "bg-orange-100 dark:bg-orange-500/10",
        },
        emerald: {
            border: "border-emerald-200 dark:border-emerald-500/30",
            bg: "bg-emerald-50 dark:bg-emerald-500/5",
            text: "text-emerald-600 dark:text-emerald-400",
            icon: "bg-emerald-100 dark:bg-emerald-500/10",
        },
        cyan: {
            border: "border-cyan-200 dark:border-cyan-500/30",
            bg: "bg-cyan-50 dark:bg-cyan-500/5",
            text: "text-cyan-600 dark:text-cyan-400",
            icon: "bg-cyan-100 dark:bg-cyan-500/10",
        },
    };

    const colors = colorClasses[project.color as keyof typeof colorClasses];

    return (
        <motion.article
            id={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="scroll-mt-24"
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="text-slate-500 font-mono text-sm">
                    #{String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            <div
                className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-4",
                    reverse && "lg:direction-rtl"
                )}
            >
                <div
                    className={cn(
                        "lg:col-span-8 p-8 rounded-2xl border bg-white dark:bg-slate-900/50 shadow-sm dark:shadow-none",
                        colors.border,
                        reverse && "lg:order-2"
                    )}
                >
                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <h2 className={cn("text-3xl font-bold mb-2", colors.text)}>
                                {project.title}
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-400">{project.subtitle}</p>
                        </div>

                        <p className="text-slate-600 dark:text-slate-500 mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="mb-6">
                            <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">
                                Features
                            </h3>
                            <ul className="space-y-2">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <ChevronRight
                                            className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.text)}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-3">
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                                        colors.bg,
                                        colors.text,
                                        "hover:opacity-80"
                                    )}
                                >
                                    <Play className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    Source Code
                                </a>
                            )}
                            {project.links.case_study && (
                                <a
                                    href={project.links.case_study}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                                >
                                    <FileCode className="w-4 h-4" />
                                    Case Study
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "lg:col-span-4 flex flex-col gap-4",
                        reverse && "lg:order-1"
                    )}
                >
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50 flex-1",
                            colors.border
                        )}
                    >
                        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">
                            Metrics
                        </h3>
                        <div className="space-y-4">
                            {project.metrics.map((metric) => (
                                <div key={metric.label}>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-slate-600 dark:text-slate-500">
                                            {metric.label}
                                        </span>
                                        <span className={cn("text-2xl font-mono font-bold", colors.text)}>
                                            {metric.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50 flex-1",
                            colors.border
                        )}
                    >
                        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="group relative"
                                >
                                    <span
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg border font-mono text-sm inline-block",
                                            colors.border,
                                            colors.bg,
                                            colors.text
                                        )}
                                    >
                                        {tech.name}
                                    </span>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        {tech.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export function ProjectTerminal({
    title,
    code,
    language = "javascript"
}: {
    title: string;
    code: string;
    language?: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#0B0F14] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-slate-500" />
                    <span className="font-mono text-xs text-slate-400">
                        {title.toLowerCase().replace(/\s/g, "-")}.{language === "go" ? "go" : language === "python" ? "py" : "js"}
                    </span>
                </div>
                <div className="w-12" />
            </div>

            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                    <code className="text-slate-300">
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="table-row">
                                <span className="table-cell text-slate-700 select-none pr-4 text-right w-8">{i + 1}</span>
                                <span className="table-cell whitespace-pre">{line}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}