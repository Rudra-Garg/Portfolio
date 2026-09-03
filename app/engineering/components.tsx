"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mermaid } from "@/components/ui";
import {
    Wrench,
    Gamepad2,
    Globe,
    Zap,
    ChevronRight,
    Github,
    FileCode,
    Cpu,
} from "lucide-react";
import Image from "next/image";
import { PDFViewer, usePDFViewer } from "@/components/ui";

export function EngineeringHero() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-100/60 via-transparent to-transparent dark:from-violet-500/5 dark:via-transparent dark:to-transparent" />

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
                                /systems/archived
                            </p>
                        </div>
                    </div>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-12">
                        System architectures and engineering prototypes. While live backends are offline, these archives demonstrate the rigorous engineering behind the gameplay.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Gamepad2,
                                label: "Game Systems",
                                desc: "Entity Component Systems, State Sync",
                            },
                            {
                                icon: Globe,
                                label: "Distributed Logic",
                                desc: "P2P, WebSockets, Sharding",
                            },
                            {
                                icon: Zap,
                                label: "Performance",
                                desc: "Worker Pools, Binary Protocols",
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
        demoMedia?: string;
        demoAspect?: "video" | "mobile" | "square";
        architecture?: string;
    };
    index: number;
    reverse?: boolean;
}

export function ProjectBento({ project, index, reverse }: ProjectBentoProps) {
    const { viewer, openPDF, closePDF } = usePDFViewer();

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

    const colors = colorClasses[project.color as keyof typeof colorClasses] || colorClasses.cyan;

    return (
        <motion.article
            id={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="scroll-mt-24"
        >
            <div className="flex items-center gap-3 mb-6">
                <span className="text-slate-500 font-mono text-sm">
                    #{String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    System Archived
                </span>
            </div>

            <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", reverse && "lg:direction-rtl")}>
                {/* Left Column: Context & Details */}
                <div className={cn("flex flex-col h-full", reverse && "lg:order-2")}>
                    <div className="mb-6">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className={cn("text-3xl md:text-4xl font-bold", colors.text)}>
                                {project.title}
                            </h2>
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors shrink-0"
                                >
                                    <Github className="w-4 h-4" />
                                    Source
                                </a>
                            )}
                        </div>
                        <p className="text-lg text-slate-700 dark:text-slate-400 font-medium mt-2">
                            {project.subtitle}
                        </p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-500 mb-8 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mb-8">
                        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">
                            Key Engineering
                        </h3>
                        <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                    <ChevronRight className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.text)} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                        {project.metrics.map((metric) => (
                            <div key={metric.label}>
                                <div className={cn("text-lg font-mono font-bold mb-1", colors.text)}>
                                    {metric.value}
                                </div>
                                <div className="text-xs text-slate-500 leading-tight">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {project.links.case_study && (
                        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
                            <button
                                onClick={() => openPDF(project.links.case_study!, project.title + " Case Study")}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
                            >
                                <FileCode className="w-4 h-4" />
                                Technical Study
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Visual Evidence (GIF) */}
                <div className={cn("flex flex-col gap-6", reverse && "lg:order-1")}>
                    <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 overflow-hidden shadow-2xl group">
                        {/* Browser Bar */}
                        <div className="h-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                            </div>
                            <div className="ml-4 flex-1 h-4 rounded-full bg-slate-100 dark:bg-slate-800/50" />
                        </div>

                        {/* Media Container */}
                        <div className={cn(
                            "relative bg-slate-200 dark:bg-slate-900",
                            project.demoAspect === "mobile" ? "aspect-[9/16] max-h-[500px] mx-auto w-auto" :
                                project.demoAspect === "video" ? "aspect-video" :
                                    "aspect-[4/3]"
                        )}>
                            {project.demoMedia ? (
                                <Image
                                    src={project.demoMedia}
                                    alt={`${project.title} Demo`}
                                    fill
                                    className={cn(
                                        project.demoAspect === "mobile" ? "object-contain" : "object-cover"
                                    )}
                                    unoptimized
                                />
                            ) : project.architecture ? (
                                <div className="absolute inset-0 w-full h-full bg-slate-50 dark:bg-slate-900">
                                    <Mermaid chart={project.architecture} className="h-full w-full" />
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <Cpu className="w-12 h-12 opacity-20" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tech Stack Pills - Moved under visual for balance */}
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech.name}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg border font-mono text-xs",
                                    colors.border,
                                    colors.bg,
                                    colors.text
                                )}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <PDFViewer
                file={viewer?.file || ""}
                title={viewer?.title || ""}
                isOpen={!!viewer}
                onClose={closePDF}
            />
        </motion.article>
    );
}
