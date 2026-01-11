"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    FlaskConical,
    Cpu,
    Network,
    Brain,
    FileText,
    ExternalLink,
    ChevronRight,
} from "lucide-react";

export function ResearchHero() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

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
                        <span className="text-cyan-400">Research</span>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <FlaskConical className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
                                Research Labs
                            </h1>
                            <p className="text-slate-500 font-mono text-sm mt-1">
                                /research/publications
                            </p>
                        </div>
                    </div>

                    <p className="text-xl text-slate-400 max-w-3xl mb-12">
                        Academic research in distributed systems, fog computing, UAV
                        networks, and AI/ML. Each project includes architecture decisions,
                        trade-offs, and simulation-validated results.
                    </p>

                    {/* Research Areas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Network,
                                label: "Distributed Systems",
                                desc: "Fog Computing, Edge Networks",
                            },
                            {
                                icon: Cpu,
                                label: "UAV Networks",
                                desc: "Mobility, Caching, RL Agents",
                            },
                            {
                                icon: Brain,
                                label: "AI/NLU",
                                desc: "NER, Intent Classification",
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
                                    <area.icon className="w-5 h-5 text-cyan-400" />
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

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        metrics: { label: string; value: string }[];
        techStack: string[];
        color: string;
        status: string;
    };
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const colorClasses = {
        cyan: "border-cyan-500/30 bg-cyan-500/5",
        emerald: "border-emerald-500/30 bg-emerald-500/5",
        violet: "border-violet-500/30 bg-violet-500/5",
    };

    const textColorClasses = {
        cyan: "text-cyan-400",
        emerald: "text-emerald-400",
        violet: "text-violet-400",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
                "p-6 rounded-2xl border",
                colorClasses[project.color as keyof typeof colorClasses]
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3
                            className={cn(
                                "text-2xl font-bold",
                                textColorClasses[project.color as keyof typeof textColorClasses]
                            )}
                        >
                            {project.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-400">
                            {project.status}
                        </span>
                    </div>
                    <p className="text-slate-400">{project.subtitle}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-500 mb-6">{project.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                        <p
                            className={cn(
                                "text-2xl font-mono font-bold",
                                textColorClasses[project.color as keyof typeof textColorClasses]
                            )}
                        >
                            {metric.value}
                        </p>
                        <p className="text-xs text-slate-500">{metric.label}</p>
                    </div>
                ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-slate-800/50 text-xs font-mono text-slate-400"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

interface ProjectDetailsProps {
    project: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        metrics: { label: string; value: string }[];
        techStack: string[];
        decisions: { decision: string; tradeoff: string; outcome: string }[];
        architecture: string;
        color: string;
        status: string;
    };
    index: number;
}

export function ProjectDetails({ project, index }: ProjectDetailsProps) {
    const colorClasses = {
        cyan: {
            border: "border-cyan-500/30",
            bg: "bg-cyan-500/5",
            text: "text-cyan-400",
            glow: "shadow-cyan-500/10",
        },
        emerald: {
            border: "border-emerald-500/30",
            bg: "bg-emerald-500/5",
            text: "text-emerald-400",
            glow: "shadow-emerald-500/10",
        },
        violet: {
            border: "border-violet-500/30",
            bg: "bg-violet-500/5",
            text: "text-violet-400",
            glow: "shadow-violet-500/10",
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
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-mono border",
                                colors.border,
                                colors.bg,
                                colors.text
                            )}
                        >
                            {project.status}
                        </span>
                        <span className="text-slate-600 font-mono text-sm">
                            #{String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                    <h2 className={cn("text-4xl font-bold mb-2", colors.text)}>
                        {project.title}
                    </h2>
                    <p className="text-xl text-slate-400">{project.subtitle}</p>
                </div>

                {/* Metrics summary */}
                <div className="flex gap-6">
                    {project.metrics.map((metric) => (
                        <div key={metric.label} className="text-right">
                            <p className={cn("text-2xl font-mono font-bold", colors.text)}>
                                {metric.value}
                            </p>
                            <p className="text-xs text-slate-500">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">
                            Overview
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Architecture Diagram */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Architecture
                        </h3>
                        <div className="overflow-x-auto">
                            <pre className="font-mono text-xs text-slate-400 leading-relaxed whitespace-pre">
                                {project.architecture}
                            </pre>
                        </div>
                    </div>

                    {/* Technical Decisions */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Technical Decisions
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="text-left py-3 px-4 font-mono text-slate-500 uppercase tracking-wider text-xs">
                                            Decision
                                        </th>
                                        <th className="text-left py-3 px-4 font-mono text-slate-500 uppercase tracking-wider text-xs">
                                            Trade-off
                                        </th>
                                        <th className="text-left py-3 px-4 font-mono text-slate-500 uppercase tracking-wider text-xs">
                                            Outcome
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.decisions.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-slate-800/50 last:border-0"
                                        >
                                            <td className="py-4 px-4 text-slate-300 font-medium">
                                                {row.decision}
                                            </td>
                                            <td className="py-4 px-4 text-slate-500">
                                                {row.tradeoff}
                                            </td>
                                            <td className={cn("py-4 px-4", colors.text)}>
                                                {row.outcome}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tech Stack */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg border font-mono text-sm",
                                        colors.border,
                                        colors.bg,
                                        colors.text
                                    )}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Key Metrics
                        </h3>
                        <div className="space-y-4">
                            {project.metrics.map((metric) => (
                                <div key={metric.label}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-sm text-slate-500">
                                            {metric.label}
                                        </span>
                                        <span className={cn("font-mono font-bold", colors.text)}>
                                            {metric.value}
                                        </span>
                                    </div>
                                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full", colors.bg)}
                                            style={{
                                                width: metric.value.includes("%")
                                                    ? metric.value.replace("~", "")
                                                    : "100%",
                                                background: `linear-gradient(90deg, var(--${project.color}-400), var(--${project.color}-600))`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div
                        className={cn(
                            "p-6 rounded-2xl border bg-slate-900/50",
                            colors.border
                        )}
                    >
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Resources
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="#"
                                className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:text-cyan-400 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                <span className="text-sm">View Paper</span>
                                <ExternalLink className="w-3 h-3 ml-auto" />
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:text-cyan-400 transition-colors"
                            >
                                <Cpu className="w-4 h-4" />
                                <span className="text-sm">GitHub Repository</span>
                                <ExternalLink className="w-3 h-3 ml-auto" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
