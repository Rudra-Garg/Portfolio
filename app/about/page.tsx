import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { KernelHero, Timeline, TechStackGrid, SystemsThinking } from "./components";

export const metadata: Metadata = {
    title: "The Kernel | Rudra Garg",
    description:
        "Systems Researcher & Full-Stack Engineer at IIIT Guwahati. Background, experience timeline, and technical expertise.",
};

// Timeline data - Reverse Chronological (Latest First)
const timeline = [
    {
        year: "2026",
        title: "Graduation",
        subtitle: "B.Tech Computer Science & Engineering",
        description: "Expected graduation from IIIT Guwahati. Ready for roles in Systems Engineering, Backend Infrastructure, or Research.",
        type: "education" as const,
        upcoming: true,
    },
    {
        year: "Nov 2025",
        title: "MUCEDS (UAV Research)",
        subtitle: "Hierarchical RL & LSTM",
        description:
            "Developed a cost-efficient UAV deployment scheme for Vehicular Edge Networks. Integrated SUMO traffic simulation with PyTorch RL agents to optimize fleet positioning, achieving ~90% Cache Hit Ratio.",
        type: "research" as const,
        highlight: "~90% Cache Hit",
    },
    {
        year: "Oct 2025",
        title: "LOKI Voice Assistant",
        subtitle: "Hybrid NLU Engine",
        description:
            "Engineered a local-first voice assistant. Achieved 99.77% NER F1-score using a dual-layer architecture: fast-path embeddings for latency (<60ms) and local LLM fallback for semantic complexity.",
        type: "research" as const,
        highlight: "99.77% F1-Score",
    },
    {
        year: "Aug 2025",
        title: "GRIG Technologies",
        subtitle: "Back End Developer Intern (Jun '24 - Aug '25)",
        description:
            "Concluded a year-long internship. Engineered certificate generation systems (98.3% speedup) and orchestrated containerized microservices on Kubernetes. Built scalable RESTful APIs with Flask/FastAPI.",
        type: "work" as const,
        highlight: "98.3% Speedup",
    },
    {
        year: "Jun 2025",
        title: "TerraQuest",
        subtitle: "Distributed Geo-Gaming Engine",
        description:
            "Built a high-concurrency Go backend processing 81,000+ geographical points. Implemented a worker-pool data pipeline and real-time WebSocket state synchronization for multiplayer lobbies.",
        type: "work" as const, // Using 'work' type for Engineering Projects
        highlight: "Go Concurrency",
    },
    {
        year: "Apr 2025",
        title: "Portal Gambit",
        subtitle: "Non-Euclidean Chess Engine",
        description:
            "Designed a custom chess engine extending chess.js to support portal traversal. Architected a real-time system using Firebase Atomic Transactions and PeerJS for P2P voice communication.",
        type: "work" as const,
        highlight: "Recursive Logic",
    },
    {
        year: "Mar 2025",
        title: "Fog Computing Testbed",
        subtitle: "GVMP Strategy Validation ",
        description:
            "Constructed a 4-tier distributed Fog testbed using Docker and Linux Traffic Control (tc). Validated the Gateway Validation Module Placement strategy, reducing network usage by 95% vs Edge-Ward.",
        type: "research" as const,
        highlight: "Virtual Testbed",
    },
    {
        year: "Feb 2024",
        title: "Pilgrim AI",
        subtitle: "Mental Health Architecture",
        description:
            "Developed a cross-platform Flutter application backed by Google Vertex AI (PaLM 2). Implemented context-aware session management on Google App Engine for empathetic conversational agents.",
        type: "work" as const,
        highlight: "Google Cloud",
    },
    {
        year: "2022",
        title: "IIIT Guwahati",
        subtitle: "B.Tech CSE - Started",
        description:
            "Began undergraduate studies. Built a strong foundation in Distributed Systems, Network Engineering, and Data Structures. Current Semester 7 CGPA: 8.42.",
        type: "education" as const,
    },
];

// Tech stack data organized by resume categories
const techStack = {
    "Languages": {
        description: "Core programming languages for systems and application development",
        items: [
            { name: "Python", level: "advanced", years: 4 },
            { name: "C++", level: "advanced", years: 3 },
            { name: "Java", level: "intermediate", years: 2 },
            { name: "Go (Golang)", level: "intermediate", years: 1 },
            { name: "JavaScript (ES6+)", level: "intermediate", years: 1 },
        ],
    },
    "Frameworks & Tech": {
        description: "Full-stack frameworks for web, mobile, and orchestration",
        items: [
            { name: "Flask / FastAPI", level: "advanced", years: 3 },
            { name: "React / Vue 3", level: "advanced", years: 2 },
            { name: "Gin Gonic", level: "intermediate", years: 1 },
            { name: "Temporal", level: "intermediate", years: 2 },
            { name: "Flutter", level: "intermediate", years: 1 },

        ],
    },
    "Cloud & Databases": {
        description: "Cloud-native infrastructure and persistence layers",
        items: [
            { name: "GCP / AWS / Azure", level: "advanced", years: 3 },
            { name: "PostgreSQL / MySQL", level: "advanced", years: 3 },
            { name: "Firebase / Supabase", level: "advanced", years: 3 },
            { name: "MongoDB", level: "intermediate", years: 1 },
        ],
    },
    "Tools & Observability": {
        description: "DevOps, monitoring, and collaboration tools",
        items: [
            { name: "Docker / Linux", level: "advanced", years: 3 },
            { name: "Git / GitHub", level: "advanced", years: 3 },
            { name: "Postman / Swagger", level: "advanced", years: 3 },
            { name: "Prometheus / Grafana", level: "intermediate", years: 1 },
        ],
    },
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="relative min-h-screen pt-16">
                <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
                <div className="relative">
                    <KernelHero />
                    <TechStackGrid stack={techStack} />
                    <SystemsThinking />
                    <Timeline events={timeline} />
                </div>
            </main>
            <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
                <Footer />
            </div>
        </>
    );
}