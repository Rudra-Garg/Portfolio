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
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <a href="/" className="hover:text-cyan-400 transition-colors">
                            Home
                        </a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-violet-400">Engineering</span>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Wrench className="w-7 h-7 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
                                Engineering
                            </h1>
                            <p className="text-slate-500 font-mono text-sm mt-1">
                                /products/shipped
                            </p>
                        </div>
                    </div>

                    <p className="text-xl text-slate-400 max-w-3xl mb-12">
                        Production-grade applications built for scale. Real-time systems,
                        multiplayer games, and backend optimizations with measurable impact.
                    </p>

                    {/* Project Types */}
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
                                className="p-4 rounded-xl border border-slate-800 bg-slate-900/30"
                            >
                                <div className="flex items-center gap-3">
                                    <area.icon className="w-5 h-5 text-violet-400" />
                                    <div>
                                        <p className="font-medium text-slate-200">{area.label}</p>
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
            border: "border-orange-500/30",
            bg: "bg-orange-500/5",
            text: "text-orange-400",
            icon: "bg-orange-500/10",
        },
        emerald: {
            border: "border-emerald-500/30",
            bg: "bg-emerald-500/5",
            text: "text-emerald-400",
            icon: "bg-emerald-500/10",
        },
        cyan: {
            border: "border-cyan-500/30",
            bg: "bg-cyan-500/5",
            text: "text-cyan-400",
            icon: "bg-cyan-500/10",
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
            {/* Project Number */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-slate-700 font-mono text-sm">
                    #{String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Bento Grid */}
            <div
                className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-4",
                    reverse && "lg:direction-rtl"
                )}
            >
                {/* Main Card */}
                <div
                    className={cn(
                        "lg:col-span-8 p-8 rounded-2xl border bg-slate-900/50",
                        colors.border,
                        reverse && "lg:order-2"
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className={cn("text-3xl font-bold mb-2", colors.text)}>
                                {project.title}
                            </h2>
                            <p className="text-lg text-slate-400">{project.subtitle}</p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                            <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">
                                Features
                            </h3>
                            <ul className="space-y-2">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-400">
                                        <ChevronRight
                                            className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.text)}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Links */}
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
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-400 bg-slate-800/50 hover:text-slate-200 transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    Source Code
                                </a>
                            )}
                            {project.links.case_study && (
                                <a
                                    href={project.links.case_study}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-400 bg-slate-800/50 hover:text-slate-200 transition-colors"
                                >
                                    <FileCode className="w-4 h-4" />
                                    Case Study
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side Cards */}
                <div
                    className={cn(
                        "lg:col-span-4 flex flex-col gap-4",
                        reverse && "lg:order-1"
                    )}
                >
                    {/* Metrics Card */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50 flex-1",
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
                                        <span className="text-sm text-slate-500">
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

                    {/* Tech Stack Card */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50 flex-1",
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
                                    {/* Tooltip */}
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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

// Terminal-style project card variant
export function ProjectTerminal({
    project,
}: {
    project: {
        title: string;
        description: string;
        techStack: string[];
    };
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-slate-500 ml-2">
                    ~/projects/{project.title.toLowerCase().replace(/\s/g, "-")}
                </span>
            </div>

            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm">
                <div className="text-slate-500">
                    <span className="text-cyan-400">$</span> cat README.md
                </div>
                <div className="mt-2 text-slate-400">
                    <span className="text-violet-400"># {project.title}</span>
                    <br />
                    <br />
                    {project.description}
                </div>
                <div className="mt-4 text-slate-500">
                    <span className="text-cyan-400">$</span> cat package.json | jq
                    &apos;.dependencies&apos;
                </div>
                <div className="mt-2 text-slate-400">
                    {"{"}
                    {project.techStack.map((tech, i) => (
                        <div key={tech} className="pl-4">
                            <span className="text-emerald-400">&quot;{tech}&quot;</span>:{" "}
                            <span className="text-orange-400">&quot;latest&quot;</span>
                            {i < project.techStack.length - 1 ? "," : ""}
                        </div>
                    ))}
                    {"}"}
                </div>
                <div className="mt-4 flex items-center text-slate-600">
                    <span className="text-cyan-400">$</span>
                    <span className="ml-2 terminal-cursor" />
                </div>
            </div>
        </div>
    );
}
