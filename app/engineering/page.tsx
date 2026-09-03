import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { EngineeringHero, ProjectBento } from "./components";
import { Mermaid } from "@/components/ui";

export const metadata: Metadata = {
    title: "Engineering | Rudra Garg",
    description:
        "Production-grade applications: real-time multiplayer games, geo-location services, and AI-driven platforms.",
};

// Engineering project data
const projects = [
    {
        id: "portal-gambit",
        title: "Portal Gambit",
        subtitle: "Non-Euclidean Real-Time Chess Engine",
        description:
            "A complex chess variant engineered with a custom recursive pathfinding algorithm to handle portal traversals. Features a server-offset synchronized timer system and P2P voice chat via WebRTC, ensuring competitive integrity in a distributed environment.",
        features: [
            "Recursive Move Validation (Graph Traversal)",
            "Optimistic UI with Firebase Atomic Transactions",
            "P2P Signaling via Firestore (No dedicated turn server)",
            "Server-Authority Time Synchronization",
        ],
        techStack: [
            { name: "React 18", category: "Frontend" },
            { name: "Firebase", category: "Real-time DB" },
            { name: "FastAPI", category: "Backend" },
            { name: "PeerJS", category: "WebRTC" },
            { name: "Vite", category: "Build Tool" },
        ],
        metrics: [
            { label: "Test Coverage", value: "15+ Suites" },
            { label: "Latency", value: "<100ms" },
            { label: "Voice Sync", value: "P2P UDP" },
        ],
        color: "orange",
        demoAspect: "video" as const,
        links: {
            github: "https://github.com/Rudra-Garg/portal-gambit-frontend",
        },
        demoMedia: "/demos/portal-gambit.gif",
        architecture: `
        sequenceDiagram
            participant P1 as Player 1
            participant FB as Firebase RTDB
            participant P2 as Player 2
            participant Peer as PeerJS/WebRTC

            Note over P1, P2: Game State Synchronization
            P1->>FB: Atomic Move Transaction (FEN)
            FB-->>P1: Ack (Optimistic Update)
            FB-->>P2: Push New State

            Note over P1, P2: P2P Voice Layer
            P1->>FB: Signal Offer (SDP)
            FB->>P2: Relay Signal
            P2->>FB: Signal Answer
            P1<->>P2: P2P Audio Stream (UDP)
        `
    },
    {
        id: "terraquest",
        title: "TerraQuest",
        subtitle: "Concurrent Geo-Spatial Gaming Platform",
        description:
            "A high-throughput multiplayer engine built in Go. Leverages Goroutines and Worker Pools to concurrently process and validate 81,000+ global locations from Google Street View API, storing them in a PostGIS-optimized database.",
        features: [
            "Go Worker Pools for Mass Data Ingestion",
            "Thread-safe Lobby Management (RWMutex)",
            "Exponential Decay Scoring Algorithm",
            "Dual-Map Engine (Leaflet + StreetView SDK)",
        ],
        techStack: [
            { name: "Go (Gin)", category: "Backend" },
            { name: "Vue 3", category: "Frontend" },
            { name: "PostgreSQL", category: "Database" },
            { name: "Gorilla WS", category: "Real-time" },
            { name: "Pinia", category: "State" },
        ],
        metrics: [
            { label: "Data Points", value: "81,000+" },
            { label: "Concurrency", value: "Worker Pool" },
            { label: "Map FPS", value: "60 FPS" },
        ],
        color: "emerald",
        links: {
            github: "https://github.com/Rudra-Garg/TerraQuest",
        },
        architecture: `
        graph TD
            Client("Vue 3 Client") -->|WS: Game State| GoHub["Go WebSocket Hub"]
            Client -->|HTTP: Auth| Gin["Gin API Gateway"]

            subgraph Backend ["Go Backend System"]
                GoHub --> Match["Lobby Manager (Mutex)"]
                Gin --> DB[("PostgreSQL/GORM")]

                subgraph Data Pipeline
                    Worker["Worker Pool"] -->|Concurrent Req| GMaps["Google Maps API"]
                    Worker -->|Batch Insert| DB
                end
            end

            style Backend fill:#1e293b,stroke:#10b981,stroke-width:2px
        `
    },
    {
        id: "pilgrim-ai",
        title: "Pilgrim AI",
        subtitle: "Hybrid Mental Health Architecture",
        description:
            "A multi-platform mental health ecosystem integrating Google Vertex AI for empathetic counseling. Features a decentralized 3-tier architecture with a context-aware session management system hosted on Google App Engine.",
        features: [
            "Context-Aware Chat Persistence (Session ID)",
            "Few-Shot Prompt Engineering (PaLM 2)",
            "Geospatial Resource Discovery (Collision-Aware)",
            "Cross-Platform State (Flutter GetX + Web)",
        ],
        techStack: [
            { name: "Flutter", category: "Mobile" },
            { name: "Flask", category: "Backend" },
            { name: "Vertex AI", category: "LLM" },
            { name: "App Engine", category: "Cloud" },
            { name: "Google Maps", category: "GIS" },
        ],
        metrics: [
            { label: "Uptime", value: "99.9%" },
            { label: "Platforms", value: "Mobile/Web" },
            { label: "AI Model", value: "PaLM 2" },
        ],
        color: "cyan",
        demoAspect: "mobile" as const,
        links: {
            github: "https://github.com/Rudra-Garg/PILGRIMAI",
        },
        demoMedia: "/demos/pilgrim.gif",
        architecture: `
        graph LR
            Mobile("Flutter App") -->|REST/JSON| API["Flask Backend"]
            Web("React Web") -->|REST/JSON| API

            subgraph GCP ["Google Cloud Platform"]
                API -->|Session Context| Vertex["Vertex AI (PaLM 2)"]
                API -->|Geospatial Query| Maps["Google Maps Platform"]
                API -->|Auto-Scaling| GAE["App Engine"]
            end

            style GCP fill:#1e293b,stroke:#06b6d4,stroke-width:2px
        `
    },
];

export default function EngineeringPage() {
    return (
        <>
            <Navbar />
            <main className="relative min-h-screen pt-16">
                <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
                <div className="relative">
                    <EngineeringHero />

                    {/* Projects Grid */}
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="space-y-24">
                                {projects.map((project, index) => (
                                    <div key={project.id} className="space-y-12">
                                        <ProjectBento
                                            project={project}
                                            index={index}
                                            reverse={index % 2 === 1}
                                        />
                                        {/* Architecture Diagram */}
                                        {project.demoMedia && (
                                            <div className="max-w-4xl mx-auto">
                                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 overflow-hidden">
                                                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                                                        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">System Architecture</span>
                                                    </div>
                                                    <Mermaid chart={project.architecture} className="border-0 rounded-none bg-transparent" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
                <Footer />
            </div>
        </>
    );
}
