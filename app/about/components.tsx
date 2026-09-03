"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    User,
    GraduationCap,
    Briefcase,
    FlaskConical,
    ChevronRight,
    MapPin,
    Calendar,
    Code,
    Brain,
    Network,
    Layers,
    Activity,
    Download,
} from "lucide-react";
import { PDFViewer, usePDFViewer } from "@/components/ui";

export function KernelHero() {
    const { viewer, openPDF, closePDF } = usePDFViewer();

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/60 via-transparent to-transparent dark:from-emerald-500/5 dark:via-transparent dark:to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <a href="/" className="hover:text-emerald-600 dark:hover:text-cyan-400 transition-colors">
                            Home
                        </a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">The Kernel</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                        <div className="w-24 h-24 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/30">
                            <User className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
                                    Rudra Garg
                                </h1>
                                <span className="px-3 py-1 rounded-full text-xs font-mono border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                    Open to Work
                                </span>
                            </div>



                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                                Backend Engineer | Distributed Systems & Applied AI
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>India</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>IIIT Guwahati, CSE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Class of 2026</span>
                                </div>
                            </div>

                            <p className="text-slate-500 font-mono text-sm mt-4">
                                CGPA: <span className="text-emerald-700 dark:text-emerald-400 font-bold">8.48</span>
                            </p>

                            <button
                                onClick={() => openPDF("/resume", "Resume")}
                                className="inline-flex items-center gap-2 px-4 py-2 mt-4 mb-2 text-sm font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors cursor-pointer"
                            >
                                <Download className="w-4 h-4" />
                                Resume
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <PDFViewer
                file={viewer?.file || ""}
                title={viewer?.title || ""}
                isOpen={!!viewer}
                onClose={closePDF}
            />
        </section>
    );
}

export function SystemsThinking() {
    const principles = [
        {
            icon: Layers,
            title: "Layered Abstraction",
            description:
                "Understanding systems from low-level networking (Linux TC, TCP/IP) to high-level orchestration (Kubernetes, service mesh).",
        },
        {
            icon: Network,
            title: "Distributed First",
            description:
                "Designing for failure, partition tolerance, and eventual consistency. Real-world systems are distributed—embrace it.",
        },
        {
            icon: Activity,
            title: "Measure, Don't Guess",
            description:
                "Prometheus metrics, profiling, and observability before optimization. Data-driven decisions over intuition-based changes.",
        },
        {
            icon: Brain,
            title: "Theory Meets Practice",
            description:
                "Research simulations validated on real testbeds. Academic rigor combined with production engineering pragmatism.",
        },
    ];

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-px bg-emerald-500" />
                        <span className="font-mono text-sm text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            Philosophy
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Systems Thinking
                    </h2>
                    <p className="text-slate-500 max-w-2xl">
                        My approach to engineering is rooted in understanding systems
                        holistically—from the kernel to the cloud.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <principle.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-2">
                                        {principle.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed">
                                        {principle.description}
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

interface TimelineEvent {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    type: "education" | "work" | "research";
    highlight?: string;
    upcoming?: boolean;
}

interface TimelineProps {
    events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
    const typeIcons = {
        education: GraduationCap,
        work: Briefcase,
        research: FlaskConical,
    };

    const typeColors = {
        education: {
            bg: "bg-blue-50 dark:bg-blue-500/10",
            border: "border-blue-200 dark:border-blue-500/30",
            text: "text-blue-600 dark:text-blue-400",
        },
        work: {
            bg: "bg-orange-50 dark:bg-orange-500/10",
            border: "border-orange-200 dark:border-orange-500/30",
            text: "text-orange-600 dark:text-orange-400",
        },
        research: {
            bg: "bg-violet-50 dark:bg-violet-500/10",
            border: "border-violet-200 dark:border-violet-500/30",
            text: "text-violet-600 dark:text-violet-400",
        },
    };

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-px bg-cyan-500" />
                        <span className="font-mono text-sm text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                            Journey
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                        Experience Timeline
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:-translate-x-px" />

                    <div className="space-y-12">
                        {events.map((event, index) => {
                            const Icon = typeIcons[event.type];
                            const colors = typeColors[event.type];
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={`${event.year}-${event.title}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={cn(
                                        "relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12",
                                        event.upcoming && "opacity-60"
                                    )}
                                >
                                    <div className="md:hidden flex items-center gap-3 mb-2 ml-12">
                                        <span className="font-mono text-lg text-cyan-600 dark:text-cyan-400">
                                            {event.year}
                                        </span>
                                        {event.highlight && (
                                            <span className={cn("px-2 py-0.5 rounded-full text-xs font-mono", colors.bg, colors.text)}>
                                                {event.highlight}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={cn(
                                            "relative pl-12 md:pl-0",
                                            isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "absolute left-0 top-0 w-8 h-8 rounded-lg flex items-center justify-center md:hidden",
                                                colors.bg,
                                                colors.border,
                                                "border"
                                            )}
                                        >
                                            <Icon className={cn("w-4 h-4", colors.text)} />
                                        </div>

                                        <div
                                            className={cn(
                                                "hidden md:flex items-center gap-3 mb-2",
                                                isLeft ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <span className="font-mono text-lg text-cyan-600 dark:text-cyan-400">
                                                {event.year}
                                            </span>
                                            {event.highlight && (
                                                <span className={cn("px-2 py-0.5 rounded-full text-xs font-mono", colors.bg, colors.text)}>
                                                    {event.highlight}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className={cn(
                                                "p-5 rounded-xl border bg-white dark:bg-slate-900/50 shadow-sm dark:shadow-none",
                                                colors.border
                                            )}
                                        >
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                                                {event.title}
                                            </h3>
                                            <p className={cn("text-sm mb-2", colors.text)}>
                                                {event.subtitle}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-500">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={cn(
                                            "hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl items-center justify-center border z-10 bg-white dark:bg-slate-950",
                                            colors.bg,
                                            colors.border
                                        )}
                                    >
                                        <Icon className={cn("w-5 h-5", colors.text)} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface TechStackGridProps {
    stack: {
        [category: string]: {
            description: string;
            items: { name: string; level: string }[];
        };
    };
}

export function TechStackGrid({ stack }: TechStackGridProps) {
    const levelColors = {
        advanced: {
            bg: "bg-cyan-50 dark:bg-cyan-500/10",
            border: "border-cyan-200 dark:border-cyan-500/30",
            text: "text-cyan-700 dark:text-cyan-400",
            bar: "bg-cyan-500 dark:bg-cyan-400",
        },
        intermediate: {
            bg: "bg-slate-100 dark:bg-slate-700/30",
            border: "border-slate-200 dark:border-slate-600/30",
            text: "text-slate-600 dark:text-slate-400",
            bar: "bg-slate-400 dark:bg-slate-500",
        },
    };

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-px bg-violet-500" />
                        <span className="font-mono text-sm text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                            Technical
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Tech Stack
                    </h2>
                    <p className="text-slate-500 max-w-2xl">
                        Technologies I use across infrastructure, backend, AI/research, and
                        frontend development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(stack).map(([category, data], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm dark:shadow-none"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                                    {category}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">{data.description}</p>

                            <div className="space-y-3">
                                {data.items.map((item) => {
                                    const colors =
                                        levelColors[item.level as keyof typeof levelColors];
                                    return (
                                        <div key={item.name}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span
                                                    className={cn("font-mono text-sm", colors.text)}
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full", colors.bar)}
                                                    style={{
                                                        width:
                                                            item.level === "advanced" ? "90%" : "60%",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}