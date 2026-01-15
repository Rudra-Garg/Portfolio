import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { ResearchHero, ProjectDetails } from "./components";

export const metadata: Metadata = {
    title: "Research Labs | Rudra Garg",
    description:
        "Academic research projects in Fog Computing, UAV Edge Networks, and Voice NLU. Rigorous simulations, benchmarks, and technical reports.",
};

// Research project data
const projects = [
    {
        id: "loki",
        title: "LOKI",
        subtitle: "Desktop-Native Voice Assistant with Hybrid NLU",
        description:
            "A privacy-first, offline-capable voice assistant that outperforms cloud-dependent alternatives in latency and system integration. Features a novel hybrid NLU engine that combines a fast embedding-based classifier with a local LLM fallback for complex intent understanding.",
        metrics: [
            { label: "NER F1-Score", value: "99.77%" },
            { label: "Precision", value: "99.77%" },
            { label: "Samples", value: "1389" },
        ],
        techStack: ["Python", "Faster-Whisper", "Sentence-Transformers", "Ollama (LLM)", "sklearn-crfsuite"],
        decisions: [
            {
                decision: "Hybrid NLU Architecture",
                tradeoff: "Complexity vs Latency/Accuracy",
                outcome:
                    "Used 'FastClassifier' (Embeddings) for common commands (<60ms) and 'LLMClassifier' (Ollama) only for complex queries, balancing speed and flexibility.",
            },
            {
                decision: "Synthetic Data Generation",
                tradeoff: "Realism vs Training Volume",
                outcome:
                    "Generated 1389 labeled sentences to train the CRF model, achieving 99.77% F1-score on parameter extraction without expensive manual labeling.",
            },
            {
                decision: "Agent-Based Dispatch",
                tradeoff: "Monolithic vs Modular",
                outcome:
                    "Decoupled NLU from execution. New capabilities (e.g., Volume Control, Calculator) can be added as independent agents without retraining the core model.",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    LOKI Hybrid NLU Pipeline                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐                                           │
│  │ Voice Input │                                           │
│  └──────┬──────┘                                           │
│         │ (Faster-Whisper)                                 │
│         ▼                                                  │
│  ┌─────────────┐    Confidence > 0.6?    ┌────────────────┐│
│  │ Transcript  │ ───────────┬──────────▶ │ FastClassifier ││
│  └─────────────┘            │            │ (Embeddings)   ││
│                             │            └───────┬────────┘│
│                             │                    │         │
│                             ▼                    │         │
│                    ┌────────────────┐            │         │
│                    │ LLM Fallback   │            │         │
│                    │ (Ollama/Phi)   │            │         │
│                    └────────┬───────┘            │         │
│                             │                    │         │
│                             ▼                    ▼         │
│                    ┌────────────────────────────────────┐  │
│                    │      Intent & Parameter Merger     │  │
│                    └────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`,
        color: "violet",
        status: "Project Completed",
    },
    {
        id: "muceds",
        title: "MUCEDS",
        subtitle: "Multi-UAV Cost-Efficient Deployment Scheme",
        description:
            "A joint optimization framework for UAV-assisted Vehicular Edge Computing Networks (VECNs). Integrates realistic mobility modeling (SUMO) with Hierarchical Reinforcement Learning (HRL) and LSTM-based predictive caching to minimize latency and maximize system profit.",
        metrics: [
            { label: "Cache Hit Ratio", value: "~90%" },
            { label: "Profit Increase", value: "4x vs Base" },
            { label: "Latency", value: "~21 Steps" },
        ],
        techStack: ["Python", "PyTorch", "SUMO", "TraCI", "DDQN", "MADDPG", "LSTM"],
        decisions: [
            {
                decision: "Hierarchical RL (HRL)",
                tradeoff: "Training Stability vs Control Granularity",
                outcome:
                    "Decomposed problem: DDQN (Outer) optimizes UAV count (Strategic), while MADDPG (Inner) optimizes position (Tactical). Stabilized training convergence.",
            },
            {
                decision: "Spatial-Temporal LSTM",
                tradeoff: "Compute Overhead vs Reactive Caching",
                outcome:
                    "Predictive caching based on user request patterns increased Cache Hit Ratio from ~20% (Zipf) to ~90%, significantly reducing cloud backhaul costs.",
            },
            {
                decision: "SUMO Integration",
                tradeoff: "Simulation Complexity vs Realism",
                outcome:
                    "Replaced random waypoint models with real city topologies (Delhi, Mumbai). Proved UAVs could learn to track realistic traffic hotspots.",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    MUCEDS Control Loop                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐       ┌──────────────┐      ┌───────────┐ │
│  │  SUMO World  │◀─────▶│ Python Agent │◀────▶│ Prediction│ │
│  │ (Real Maps)  │       │ (HRL Control)│      │  (LSTM)   │ │
│  └──────┬───────┘       └──────┬───────┘      └───────────┘ │
│         │                      │                            │
│         ▼                      ▼                            │
│  Traffic Density        Action (Count, Vel)                 │
│         │                      │                            │
│         └──────────┬───────────┘                            │
│                    ▼                                        │
│           ┌──────────────────┐                              │
│           │ System Reward    │                              │
│           │ (Profit - Cost)  │                              │
│           └──────────────────┘                              │
└─────────────────────────────────────────────────────────────┘`,
        color: "cyan",
        status: "Simulation Study",
    },
    {
        id: "gvmp",
        title: "GVMP",
        subtitle: "Gateway Validation Module Placement",
        description:
            "A novel sibling-aware placement strategy for Fog Computing. Unlike standard Edge-Ward placement which pushes tasks to the cloud when a node is full, GVMP validates resources on neighboring 'sibling' nodes via the gateway, keeping processing at the edge.",
        metrics: [
            { label: "Network Reduction", value: "95%" },
            { label: "E2E Latency", value: "Low (Edge)" },
            { label: "Load Balance", value: "Optimized" },
        ],
        techStack: ["iFogSim", "Docker", "Linux TC", "Prometheus", "Grafana"],
        decisions: [
            {
                decision: "Sibling-Awareness",
                tradeoff: "Search Complexity vs Network Load",
                outcome:
                    "Checking sibling nodes before cloud offloading reduced network usage by 89-95% compared to EWMP, as proven in iFogSim simulations.",
            },
            {
                decision: "Virtual Testbed Validation",
                tradeoff: "Implementation Effort vs Simulation Only",
                outcome:
                    "Built a 15-container Docker testbed with Linux Traffic Control (tc) to validate findings. Confirmed 16ms Edge latency vs 5600ms Cloud latency.",
            },
        ],
        architecture: `┌─────────────────────────────────────────────────────────────┐
│                    GVMP Placement Logic                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│       [Cloud]  <---- (3) Only if siblings full              │
│          ▲                                                  │
│          │                                                  │
│      [Gateway]  <--- (2) Check Siblings via Gateway         │
│      /       \                                              │
│     /         \                                             │
│ [Edge 1] -- [Edge 2]                                        │
│    ▲           ▲                                            │
│    │           │                                            │
│  Task 1      (1) Try Local First                            │
│                                                             │
│  Result: Task stays in Fog Layer, avoiding Cloud Backhaul   │
└─────────────────────────────────────────────────────────────┘`,
        color: "emerald",
        status: "Report Available",
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