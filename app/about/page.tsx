import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { KernelHero, Timeline, TechStackGrid, SystemsThinking } from "./components";

export const metadata: Metadata = {
    title: "About & Experience | Rudra Garg",
    description:
        "Backend Engineer focused on Distributed Systems & Applied AI. Background, experience timeline, and technical expertise.",
};

// Timeline data - Reverse Chronological (Latest First)
const timeline = [
    {
        year: "2026",
        title: "Graduation",
        subtitle: "B.Tech CSE · IIIT Guwahati · 2022–2026",
        description: "B.Tech Computer Science & Engineering, IIIT Guwahati. CGPA: 8.48. Seeking roles in Backend Engineering, Distributed Systems, and Applied AI.",
        type: "education" as const,
        upcoming: false,
    },
    {
        year: "Nov 2025",
        title: "MUCEDS (UAV Research)",
        subtitle: "Hierarchical RL & LSTM",
        description:
            "Developed a cost-efficient UAV deployment scheme for Vehicular Edge Networks. Integrated SUMO traffic simulation with PyTorch RL agents to optimize fleet positioning, improving cache hit ratio from 18% to 78% and reducing average task latency by 53% in the reported simulation evaluation.",
        type: "research" as const,
        highlight: "78% Cache Hit",
    },
    {
        year: "Oct 2025",
        title: "LOKI Voice Assistant",
        subtitle: "Hybrid NLU Engine",
        description:
            "Engineered a local-first voice assistant. Achieved a weighted NER F1-score of 0.9977 using a dual-layer architecture: fast-path embeddings for common commands and local LLM fallback for semantic complexity.",
        type: "research" as const,
        highlight: "99.77% F1-Score",
    },
    {
        year: "Aug 2025",
        title: "GRIG Technologies",
        subtitle: "Back End Developer Intern (Jun '24 - Aug '25)",
        description:
            "Built alert.ventory with FastAPI and Temporal for priority-based notifications and human approval. Developed request.ventory with Firestore and Supabase, implemented OAuth2/JWT authentication and RBAC, and automated Kubernetes infrastructure with Helm, NGINX Ingress, and cert-manager.",
        type: "work" as const,
        highlight: "Backend & Infrastructure",
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
            "Began undergraduate studies at IIIT Guwahati. Built a foundation in Distributed Systems, Network Engineering, and Data Structures.",
        type: "education" as const,
    },
];

// Tech stack data organized by resume categories
const techStack = {
    "Languages": {
        description: "Core programming languages for systems and application development",
        items: [
            { name: "Python", level: "advanced" },
            { name: "C++", level: "advanced" },
            { name: "SQL", level: "advanced" },
            { name: "Go", level: "intermediate" },
            { name: "JavaScript", level: "intermediate" },
        ],
    },
    "Backend & ML": {
        description: "Backend frameworks, ML libraries, and workflow orchestration",
        items: [
            { name: "FastAPI", level: "advanced" },
            { name: "Flask", level: "advanced" },
            { name: "Temporal", level: "intermediate" },
            { name: "SQLAlchemy", level: "advanced" },
            { name: "PyTorch", level: "intermediate" },
            { name: "NumPy", level: "advanced" },
            { name: "React", level: "intermediate" },
            { name: "Vue", level: "intermediate" },
        ],
    },
    "Cloud & Databases": {
        description: "Cloud-native infrastructure and persistence layers",
        items: [
            { name: "AWS", level: "advanced" },
            { name: "Google Cloud", level: "advanced" },
            { name: "PostgreSQL", level: "advanced" },
            { name: "Redis", level: "intermediate" },
            { name: "Supabase", level: "advanced" },
            { name: "Firebase", level: "advanced" },
            { name: "MongoDB", level: "intermediate" },
        ],
    },
    "Infrastructure": {
        description: "DevOps, containerization, CI/CD, and observability",
        items: [
            { name: "Docker", level: "advanced" },
            { name: "Kubernetes", level: "intermediate" },
            { name: "Helm", level: "intermediate" },
            { name: "GitHub Actions", level: "intermediate" },
            { name: "Prometheus", level: "intermediate" },
            { name: "Grafana", level: "intermediate" },
            { name: "Linux", level: "advanced" },
            { name: "Git", level: "advanced" },
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
                    <Timeline events={timeline} />
                    <SystemsThinking />
                    <TechStackGrid stack={techStack} />
                </div>
            </main>
            <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
                <Footer />
            </div>
        </>
    );
}
