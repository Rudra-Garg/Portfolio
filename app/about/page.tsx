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
            "Started undergraduate studies with focus on algorithms, data structures, and systems programming. CGPA: 8.29",
        type: "education" as const,
    },
    {
        year: "2024",
        title: "GRIG Technologies",
        subtitle: "Backend Engineering Intern",
        description:
            "Optimized certificate generation pipeline achieving 98.3% processing time reduction. Implemented async processing, caching, and database optimizations.",
        type: "work" as const,
        highlight: "98.3% improvement",
    },
    {
        year: "2024",
        title: "Fog Computing Research",
        subtitle: "GVMP Paper Publication",
        description:
            "Published research on Global View-Based Module Placement for fog computing. Validated 95% network reduction on Docker testbed.",
        type: "research" as const,
        highlight: "Published",
    },
    {
        year: "2025",
        title: "UAV Edge Networks",
        subtitle: "MUCEDS Research",
        description:
            "Developing hierarchical RL framework for UAV-assisted edge caching. Achieving ~90% cache hit ratio in simulations.",
        type: "research" as const,
        highlight: "Under Review",
    },
    {
        year: "2026",
        title: "Graduation",
        subtitle: "B.Tech CSE",
        description: "Expected graduation from IIIT Guwahati.",
        type: "education" as const,
        upcoming: true,
    },
];

// Tech stack data organized by category
const techStack = {
    Infrastructure: {
        description: "Container orchestration, networking, and observability",
        items: [
            { name: "Docker", level: "advanced", years: 3 },
            { name: "Kubernetes", level: "intermediate", years: 1 },
            { name: "Linux TC", level: "advanced", years: 2 },
            { name: "Prometheus", level: "intermediate", years: 1 },
            { name: "Grafana", level: "intermediate", years: 1 },
        ],
    },
    Backend: {
        description: "API development, databases, and distributed systems",
        items: [
            { name: "Go (Gin)", level: "advanced", years: 2 },
            { name: "Python", level: "advanced", years: 4 },
            { name: "FastAPI", level: "advanced", years: 2 },
            { name: "PostgreSQL", level: "advanced", years: 3 },
            { name: "Redis", level: "intermediate", years: 2 },
        ],
    },
    "AI/Research": {
        description: "Machine learning, NLP, and simulation frameworks",
        items: [
            { name: "PyTorch", level: "advanced", years: 2 },
            { name: "SUMO", level: "intermediate", years: 1 },
            { name: "spaCy", level: "advanced", years: 2 },
            { name: "Rasa NLU", level: "advanced", years: 1 },
            { name: "NetworkX", level: "intermediate", years: 2 },
        ],
    },
    Frontend: {
        description: "Modern web development and UI engineering",
        items: [
            { name: "Next.js", level: "advanced", years: 2 },
            { name: "React", level: "advanced", years: 3 },
            { name: "TypeScript", level: "advanced", years: 2 },
            { name: "Tailwind CSS", level: "advanced", years: 2 },
            { name: "Framer Motion", level: "intermediate", years: 1 },
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
