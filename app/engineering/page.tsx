import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { EngineeringHero, ProjectBento } from "./components";

export const metadata: Metadata = {
    title: "Engineering | Rudra Garg",
    description:
        "Production-grade applications: real-time multiplayer games, geo-location services, and backend optimization case studies.",
};

// Engineering project data
const projects = [
    {
        id: "portal-gambit",
        title: "Portal Gambit",
        subtitle: "Real-time Chess Variant with Voice Chat",
        description:
            "A multiplayer chess variant featuring portal mechanics for piece teleportation. Built with real-time WebSocket communication and integrated WebRTC voice chat for player communication during matches.",
        features: [
            "Custom chess rules engine with portal mechanics",
            "Real-time game state synchronization",
            "WebRTC peer-to-peer voice chat",
            "ELO-based matchmaking system",
            "Spectator mode with live commentary",
        ],
        techStack: [
            { name: "FastAPI", category: "Backend" },
            { name: "React", category: "Frontend" },
            { name: "WebSocket", category: "Real-time" },
            { name: "WebRTC", category: "Voice" },
            { name: "Redis", category: "Cache" },
            { name: "PostgreSQL", category: "Database" },
        ],
        metrics: [
            { label: "Concurrent Games", value: "100+" },
            { label: "Latency", value: "<50ms" },
            { label: "Voice Quality", value: "HD" },
        ],
        color: "orange",
        links: {
            demo: "#",
            github: "#",
        },
        image: "/projects/portal-gambit.png",
    },
    {
        id: "terraquest",
        title: "TerraQuest",
        subtitle: "Multiplayer Geo-guesser Game",
        description:
            "A competitive geography game where players guess locations from Google Street View imagery. Features real-time multiplayer lobbies, leaderboards, and validated 81,000+ unique locations worldwide.",
        features: [
            "Google Street View API integration",
            "Real-time multiplayer lobbies (up to 8 players)",
            "Scoring based on distance and time",
            "Global leaderboards and statistics",
            "Custom game modes and location sets",
        ],
        techStack: [
            { name: "Go (Gin)", category: "Backend" },
            { name: "WebSocket", category: "Real-time" },
            { name: "PostgreSQL", category: "Database" },
            { name: "Redis", category: "Cache" },
            { name: "React", category: "Frontend" },
            { name: "Google APIs", category: "External" },
        ],
        metrics: [
            { label: "Locations", value: "81,000+" },
            { label: "Players", value: "8/lobby" },
            { label: "Uptime", value: "99.9%" },
        ],
        color: "emerald",
        links: {
            demo: "#",
            github: "#",
        },
        image: "/projects/terraquest.png",
    },
    {
        id: "grig-internship",
        title: "GRIG Technologies",
        subtitle: "Backend Optimization Case Study",
        description:
            "Internship project focused on certificate generation pipeline optimization. Identified bottlenecks in PDF rendering and database queries, implementing caching strategies and async processing that reduced generation time by 98.3%.",
        features: [
            "Profiling and bottleneck identification",
            "Async PDF generation with worker queues",
            "Database query optimization (N+1 elimination)",
            "Redis caching layer for templates",
            "Batch processing for bulk generation",
        ],
        techStack: [
            { name: "Python", category: "Backend" },
            { name: "Celery", category: "Queue" },
            { name: "Redis", category: "Cache" },
            { name: "PostgreSQL", category: "Database" },
            { name: "Docker", category: "Infrastructure" },
            { name: "Prometheus", category: "Monitoring" },
        ],
        metrics: [
            { label: "Time Reduction", value: "98.3%" },
            { label: "Throughput", value: "50x" },
            { label: "P99 Latency", value: "<2s" },
        ],
        color: "cyan",
        links: {
            case_study: "#",
        },
        image: "/projects/grig.png",
    },
];

export default function EngineeringPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">
                <EngineeringHero />

                {/* Projects Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="space-y-16">
                            {projects.map((project, index) => (
                                <ProjectBento
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    reverse={index % 2 === 1}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
