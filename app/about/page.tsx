import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { KernelHero, Timeline, TechStackGrid, SystemsThinking } from "./components";

export const metadata: Metadata = {
    title: "The Kernel | Rudra Garg",
    description:
        "Systems Researcher & Full-Stack Engineer at IIIT Guwahati. Background, experience timeline, and technical expertise.",
};

// Timeline data
const timeline = [
    {
        year: "2022",
        title: "IIIT Guwahati",
        subtitle: "B.Tech Computer Science & Engineering",
        description:
            "Started undergraduate studies. Current Semester 7 CGPA: 8.42. Focused on Distributed Systems and Network Engineering.",
        type: "education" as const,
    },
    {
        year: "2024",
        title: "GRIG Technologies",
        subtitle: "Back End Developer Intern",
        description:
            "Engineered certificate generation system reducing processing time by 98.3%. Architected RESTful APIs with Flask-RESTx and optimized data retrieval efficiency by 40%.",
        type: "work" as const,
        highlight: "98.3% Speedup",
    },
    {
        year: "2024",
        title: "Fog Computing Research",
        subtitle: "GVMP Strategy",
        description:
            "Designed Gateway Validation Module Placement (GVMP). Demonstrated 95% network usage reduction compared to standard edge-ward placement using a custom Docker testbed.",
        type: "research" as const,
        highlight: "Virtual Testbed",
    },
    {
        year: "2025",
        title: "LOKI Voice Assistant",
        subtitle: "Hybrid NLU Engine",
        description:
            "Developed a desktop-native voice assistant. Achieved 99.77% NER F1-score using a hybrid FastClassifier (Embeddings) + LLM Fallback architecture.",
        type: "research" as const,
        highlight: "99.77% F1-Score",
    },
    {
        year: "2026",
        title: "Graduation",
        subtitle: "B.Tech CSE",
        description: "Expected graduation. Ready for roles in Systems Engineering, Backend Infrastructure, or Research.",
        type: "education" as const,
        upcoming: true,
    },
];

// Tech stack data organized by category
const techStack = {
    "Systems & Infra": {
        description: "Orchestration, virtualization, and low-level networking",
        items: [
            { name: "Docker", level: "advanced", years: 3 },
            { name: "Kubernetes", level: "intermediate", years: 1 },
            { name: "Linux TC", level: "advanced", years: 2 },
            { name: "Google Cloud", level: "intermediate", years: 2 },
            { name: "Prometheus", level: "intermediate", years: 1 },
        ],
    },
    Backend: {
        description: "High-performance APIs and distributed logic",
        items: [
            { name: "Go (Gin)", level: "advanced", years: 2 },
            { name: "Python (FastAPI)", level: "advanced", years: 4 },
            { name: "PostgreSQL", level: "advanced", years: 3 },
            { name: "Redis", level: "intermediate", years: 2 },
            { name: "WebSockets", level: "advanced", years: 2 },
        ],
    },
    "AI & Research": {
        description: "Machine learning pipelines and simulation",
        items: [
            { name: "PyTorch", level: "advanced", years: 2 },
            { name: "SUMO", level: "intermediate", years: 1 },
            { name: "sklearn-crfsuite", level: "advanced", years: 1 },
            { name: "NetworkX", level: "intermediate", years: 2 },
        ],
    },
    Frontend: {
        description: "Interactive UIs and real-time state",
        items: [
            { name: "React / Vite", level: "advanced", years: 3 },
            { name: "Vue 3", level: "intermediate", years: 1 },
            { name: "TypeScript", level: "advanced", years: 2 },
            { name: "Tailwind CSS", level: "advanced", years: 3 },
            { name: "Framer Motion", level: "intermediate", years: 2 },
        ],
    },
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">
                <KernelHero />
                <SystemsThinking />
                <Timeline events={timeline} />
                <TechStackGrid stack={techStack} />
            </main>
            <Footer />
        </>
    );
}