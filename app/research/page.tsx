import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { ResearchHero, ProjectCard, ProjectDetails } from "./components";

export const metadata: Metadata = {
    title: "Research Labs | Rudra Garg",
    description:
        "Academic research in Fog Computing, UAV Edge Networks, and Voice NLU. Peer-reviewed publications and simulation-validated results.",
};

// Research project data
const projects = [
    {
        id: "muceds",
        title: "MUCEDS",
        subtitle: "Multi-UAV Cooperative Edge Data Storage",
        description:
            "Hierarchical Reinforcement Learning framework for intelligent content caching in UAV-assisted edge computing networks. Combines DDQN for UAV trajectory optimization with MADDPG for cooperative caching decisions.",
        metrics: [
            { label: "Cache Hit Ratio", value: "~90%" },
            { label: "Latency Reduction", value: "45%" },
            { label: "UAV Nodes Simulated", value: "50+" },
        ],
        techStack: ["Python", "PyTorch", "SUMO", "LSTM", "DDQN", "MADDPG"],
        decisions: [
            {
                decision: "LSTM-based Content Prediction",
                tradeoff: "Higher computational overhead vs rule-based heuristics",
                outcome:
                    "90% cache hit ratio by accurately predicting user request patterns",
            },
            {
                decision: "Hierarchical RL (DDQN + MADDPG)",
                tradeoff: "Training complexity vs single-agent approaches",
                outcome:
                    "Decomposed trajectory and caching decisions for better convergence",
            },
            {
                decision: "SUMO for Realistic Mobility",
                tradeoff: "Simulation fidelity vs simplified random waypoint models",
                outcome:
                    "Validated results under realistic urban vehicular traffic patterns",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    MUCEDS Architecture                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                 │
│  │  UAV 1  │    │  UAV 2  │    │  UAV N  │   ← MADDPG      │
│  └────┬────┘    └────┬────┘    └────┬────┘     Agents      │
│       │              │              │                       │
│       └──────────────┼──────────────┘                       │
│                      │                                      │
│              ┌───────▼───────┐                             │
│              │  Edge Server  │  ← DDQN Controller          │
│              │   + Cache     │                              │
│              └───────┬───────┘                             │
│                      │                                      │
│              ┌───────▼───────┐                             │
│              │  LSTM Module  │  ← Content Prediction       │
│              └───────┬───────┘                             │
│                      │                                      │
│   ┌──────────────────┼──────────────────┐                  │
│   ▼                  ▼                  ▼                  │
│ ┌────┐            ┌────┐            ┌────┐                │
│ │User│            │User│            │User│   ← Requests   │
│ └────┘            └────┘            └────┘                │
└─────────────────────────────────────────────────────────────┘`,
        color: "cyan",
        status: "Under Review",
    },
    {
        id: "gvmp",
        title: "GVMP",
        subtitle: "Global View-Based Module Placement for Fog Computing",
        description:
            "Novel sibling-aware service placement algorithm for fog computing that leverages global network topology knowledge to minimize inter-module communication latency. Validated on a 15-container Docker testbed with Linux TC for network emulation.",
        metrics: [
            { label: "Network Reduction", value: "95%" },
            { label: "Docker Containers", value: "15" },
            { label: "Fog Nodes", value: "6" },
        ],
        techStack: ["Python", "Docker", "Linux TC", "NetworkX", "Prometheus"],
        decisions: [
            {
                decision: "Sibling-Aware Placement",
                tradeoff: "Additional placement constraints vs greedy approaches",
                outcome:
                    "95% network usage reduction by co-locating communicating modules",
            },
            {
                decision: "Linux TC for Network Emulation",
                tradeoff: "OS-level complexity vs application-level simulation",
                outcome:
                    "Realistic latency/bandwidth constraints matching fog deployments",
            },
            {
                decision: "Global View vs Distributed",
                tradeoff: "Central coordination overhead vs local optimization",
                outcome:
                    "Better global optimum for module placement in small-scale fog",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    GVMP Architecture                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Cloud Layer                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Central Orchestrator                    │   │
│  │         (Global View + Placement Engine)            │   │
│  └───────────────────────┬─────────────────────────────┘   │
│                          │                                  │
│  Fog Layer               │                                  │
│  ┌───────┐  ┌───────┐  ┌─▼─────┐  ┌───────┐  ┌───────┐   │
│  │Fog #1 │──│Fog #2 │──│Fog #3 │──│Fog #4 │──│Fog #5 │   │
│  │ [M1]  │  │[M2,M3]│  │ [M4]  │  │ [M5]  │  │[M6,M7]│   │
│  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘   │
│      │          │          │          │          │        │
│  Edge Layer (Linux TC - Latency Emulation)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    IoT Devices    │    Sensors    │    Actuators     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Docker Testbed: 15 containers across 6 fog nodes          │
└─────────────────────────────────────────────────────────────┘`,
        color: "emerald",
        status: "Published",
    },
    {
        id: "loki",
        title: "LOKI",
        subtitle: "Privacy-First Voice Assistant with Hybrid NLU",
        description:
            "Offline-first voice assistant using a hybrid NLU pipeline: fast local embeddings for common intents with LLM fallback for complex queries. Custom CRF-based Named Entity Recognition achieving 99.77% weighted F1-score.",
        metrics: [
            { label: "NER F1-Score", value: "99.77%" },
            { label: "Local Accuracy", value: "94%" },
            { label: "Response Time", value: "<200ms" },
        ],
        techStack: ["Python", "Rasa NLU", "spaCy", "CRF", "Sentence Transformers"],
        decisions: [
            {
                decision: "Hybrid Local + LLM Pipeline",
                tradeoff: "System complexity vs pure cloud or pure local approaches",
                outcome:
                    "94% queries handled locally with <200ms latency, LLM fallback for edge cases",
            },
            {
                decision: "Custom CRF for NER",
                tradeoff: "Training data requirements vs off-the-shelf NER",
                outcome:
                    "99.77% F1-score on domain-specific entities (dates, locations, commands)",
            },
            {
                decision: "Sentence Transformers for Intent",
                tradeoff: "Embedding model size vs keyword matching",
                outcome:
                    "Semantic understanding of paraphrased commands without explicit training",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    LOKI NLU Pipeline                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                           │
│  │ Voice Input │                                           │
│  └──────┬──────┘                                           │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Speech-to-Text (Whisper)                │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│         ┌───────────────┴───────────────┐                  │
│         │                               │                  │
│         ▼                               ▼                  │
│  ┌─────────────┐                 ┌─────────────┐          │
│  │ Local NLU   │                 │  CRF-based  │          │
│  │ (Embeddings)│                 │     NER     │          │
│  └──────┬──────┘                 └──────┬──────┘          │
│         │                               │                  │
│         ▼                               │                  │
│  ┌─────────────┐                        │                  │
│  │ Confidence  │──── Low ────┐         │                  │
│  │   Check     │             │         │                  │
│  └──────┬──────┘             │         │                  │
│         │ High               ▼         │                  │
│         │           ┌─────────────┐    │                  │
│         │           │ LLM Fallback│    │                  │
│         │           └──────┬──────┘    │                  │
│         │                  │           │                  │
│         └────────┬─────────┘           │                  │
│                  │                     │                  │
│                  ▼                     ▼                  │
│         ┌────────────────────────────────────┐           │
│         │         Action Executor            │           │
│         └────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘`,
        color: "violet",
        status: "In Development",
    },
];

export default function ResearchPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">
                <ResearchHero />

                {/* Projects */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="space-y-24">
                            {projects.map((project, index) => (
                                <ProjectDetails
                                    key={project.id}
                                    project={project}
                                    index={index}
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
