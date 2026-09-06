import Link from "next/link";

const heading = "text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100";
const body = "text-base leading-relaxed text-slate-600 dark:text-slate-400";
const link = "inline-flex mt-6 font-medium text-sky-700 dark:text-cyan-400 underline underline-offset-4";
const card = "rounded-2xl liquid-glass p-6 md:p-8";

export function Experience() {
    return (
        <section aria-labelledby="experience-heading" className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-sm font-mono text-sky-700 dark:text-cyan-400 mb-3">PROFESSIONAL EXPERIENCE</p>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                        <h2 id="experience-heading" className={heading}>Backend engineering at GRIG</h2>
                        <p className={`${body} mt-4`}>Back End Developer Intern</p>
                        <p className={`${body} mt-1`}>June 2024 - August 2025 · Remote</p>
                        <Link className={link} href="/about">About &amp; Experience</Link>
                    </div>
                    <div className={`${card} lg:col-span-2`}>
                        <ul className={`${body} space-y-4 list-disc pl-5`}>
                            <li><strong className="text-slate-900 dark:text-slate-100">Notification workflows:</strong> built alert.ventory with FastAPI and Temporal, including priority queues, retries, and human approval.</li>
                            <li><strong className="text-slate-900 dark:text-slate-100">Inventory APIs:</strong> developed request.ventory with Firestore and Supabase, tenant-aware data handling, and GST and geographic validation.</li>
                            <li><strong className="text-slate-900 dark:text-slate-100">Infrastructure and access:</strong> automated Kubernetes setup with Helm, Ingress, and cert-manager; implemented RBAC, OAuth2, and JWT sessions.</li>
                        </ul>
                        <Link className={link} href="/engineering#alert-ventory">Read the notification workflow case study</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

const engineering = [
    {
        name: "TerraQuest", stack: "Go · PostgreSQL · WebSockets · Vue 3", href: "/engineering#terraquest",
        description: "A multiplayer geography game with synchronized lobbies and server-side distance scoring. A Go worker pool validated 81,000+ Street View locations for its PostgreSQL dataset.",
        details: "Engineering focus: concurrent lobby state, data ingestion, and indexed location queries.",
        source: "https://github.com/Rudra-Garg/TerraQuest-Backend",
    },
    {
        name: "Portal Gambit", stack: "FastAPI · React · Firebase · WebRTC", href: "/engineering#portal-gambit",
        description: "A chess variant with custom portal movement, shared game state, and peer-to-peer voice chat. Its FastAPI backend handles authentication, game history, and ELO analytics.",
        details: "Engineering focus: asynchronous persistence, transactional relationships, and client time synchronization.",
        source: "https://github.com/Rudra-Garg/portal-gambit-backend",
    },
];

export function FeaturedEngineering() {
    return (
        <section aria-labelledby="engineering-heading" className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 id="engineering-heading" className={heading}>Featured engineering projects</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {engineering.map(project => (
                        <article key={project.name} className={card}>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
                            <p className="text-sm font-mono text-sky-700 dark:text-cyan-400 mt-3">{project.stack}</p>
                            <p className={`${body} mt-5`}>{project.description}</p>
                            <p className={`${body} mt-4`}>{project.details}</p>
                            <div className="flex flex-wrap gap-x-6">
                                <Link href={project.href} className={link}>Architecture &amp; details</Link>
                                <a href={project.source} target="_blank" rel="noopener noreferrer" className={link}>Backend source</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const research = [
    { name: "LOKI", href: "/research#loki-nlp", description: "A local voice assistant combining embedding-based intent matching, a local LLM fallback, and CRF entity extraction.", context: "Reported weighted NER F1: 0.9977. This measures entity extraction, not end-to-end assistant accuracy." },
    { name: "MUCEDS", href: "/research#muceds", description: "Hierarchical reinforcement learning for UAV fleet sizing and positioning, with LSTM-based predictive caching.", context: "Simulation results: cache hits increased from 18% to 78%, with 53% lower average task latency against the study baseline." },
    { name: "Fog Computing Testbed", href: "/research#fog-computing", description: "A four-tier Docker testbed for IoT module placement, with Linux network emulation and Prometheus/Grafana monitoring.", context: "The testbed compares sibling-aware placement with Edge-Ward placement under emulated network conditions." },
];

export function ResearchHighlights() {
    return (
        <section aria-labelledby="research-heading" className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 id="research-heading" className={heading}>Research &amp; applied AI</h2>
                <p className={`${body} mt-4`}>Model evaluations and simulation studies, with architecture notes and technical reports.</p>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {research.map(project => (
                        <article key={project.name} className={card}>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
                            <p className={`${body} mt-4`}>{project.description}</p>
                            <details className={`${body} mt-5`}>
                                <summary className="cursor-pointer font-medium text-sky-700 dark:text-cyan-400">Evaluation context</summary>
                                <p className="mt-3">{project.context}</p>
                            </details>
                            <Link href={project.href} className={link}>Read study &amp; report</Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
