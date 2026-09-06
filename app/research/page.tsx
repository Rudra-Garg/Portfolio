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
        id: "loki-nlp",
        title: "LOKI (NLP Engine)",
        subtitle: "Local-First Voice Assistant with Hybrid NLU",
        description:
            "A privacy-centric voice assistant that performs 100% local inference. It processes speech and commands locally using a dual-layer intent classification system: utilizing high-speed vector embeddings for common commands and falling back to a local Quantized LLM for complex semantic understanding.",
        metrics: [
            { label: "Weighted NER F1", value: "0.9977" },
            { label: "Inference", value: "Local" },
            { label: "Intent Fast-Path", value: "Embeddings" },
        ],
        techStack: [
            "Python",
            "Faster-Whisper",
            "Sentence-Transformers",
            "Ollama (Dolphin-Phi)",
            "sklearn-crfsuite"
        ],
        decisions: [
            {
                decision: "Hybrid Classifier Strategy",
                tradeoff: "System Complexity vs. Responsiveness",
                outcome:
                    "Implemented a 'Fast Path' (Cosine Similarity > 0.6) for common commands, reserving the heavy LLM only for complex, novel queries.",
            },
            {
                decision: "CRF for NER",
                tradeoff: "Modernity vs. Efficiency",
                outcome:
                    "Chose Conditional Random Fields over BERT for Named Entity Recognition to minimize CPU footprint while maintaining 99.77% F1-score on parameter extraction.",
            },
            {
                decision: "Threaded Architecture",
                tradeoff: "Dev Overhead vs. UX",
                outcome:
                    "Decoupled audio acquisition (VAD) and inference workers from the UI thread, ensuring the application remains responsive during heavy processing.",
            },
        ],
        architecture: `
        graph TD
            subgraph Input
                User((User Voice)) -->|Mic Input| VAD[Voice Activity Detection]
                VAD --> STT[Faster-Whisper]
                STT --> Transcript{Confidence Check}
            end
            
            subgraph Fast_Path [Fast Path: Embeddings]
                Transcript -->|Sim > 0.6| Embed[Sentence Transformers]
                Embed -->|Vector Match| Action1[Direct Action]
            end
            
            subgraph Slow_Path [Slow Path: Reasoning]
                Transcript -->|No Match| LLM[Ollama / Phi-2]
                LLM -->|JSON Generation| Intent[Structured Intent]
            end
            
            Action1 --> Agent[Agent Executor]
            Intent --> Agent
            Agent --> Sys[System / OS]
            
            style Fast_Path fill:#1e293b,stroke:#8b5cf6,stroke-width:2px
            style Slow_Path fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,stroke-dasharray: 5 5
        `,
        color: "violet",
        status: "Project Completed",
        links: {
            github: "https://github.com/Rudra-Garg/NLP-Project",
            report: "/reports/Loki.pdf",
        }
    },
    {
        id: "muceds",
        title: "MUCEDS",
        subtitle: "Multi-UAV Cost-Efficient Deployment Scheme",
        description:
            "A comprehensive optimization framework for UAV-assisted Vehicular Edge Computing. It integrates high-fidelity traffic simulation (SUMO) with a Hierarchical Reinforcement Learning (HRL) agent to dynamically position UAVs and a Spatial-Temporal LSTM to predict content demand. In the reported simulation evaluation, cache hit ratio improved from 18% to 78% and average task latency fell by 53% compared with the baseline. These are simulation results, not production measurements.",
        metrics: [
            { label: "Cache Hit Ratio", value: "18%→78%" },
            { label: "Avg Task Latency", value: "↓53%" },
            { label: "Profit vs Baseline", value: "~300%" },
        ],
        techStack: [
            "Python",
            "PyTorch",
            "SUMO (TraCI)",
            "DDQN & MADDPG",
            "Spatial-Temporal LSTM"
        ],
        decisions: [
            {
                decision: "Hierarchical RL",
                tradeoff: "Convergence Speed vs. Control",
                outcome:
                    "Decomposed the problem: DDQN manages the 'Strategic' fleet size, while MADDPG handles the 'Tactical' velocity vectors, stabilizing training.",
            },
            {
                decision: "Predictive Caching (LSTM)",
                tradeoff: "Compute Overhead vs. Backhaul Load",
                outcome:
                    "Proactive content caching based on predicted vehicle trajectories improved Cache Hit Ratio from 18% (Zipf baseline) to 78%, with 53% lower average task latency.",
            },
            {
                decision: "SUMO Physics Integration",
                tradeoff: "Simulation Speed vs. Accuracy",
                outcome:
                    "Replaced synthetic Random Waypoint models with real OpenStreetMap data (Delhi/Mumbai), to evaluate the approach with modeled urban traffic flows.",
            },
        ],
        architecture: `
        sequenceDiagram
            participant SUMO as SUMO Physics
            participant Agent as Python RL Agent
            participant LSTM as LSTM Predictor
            participant Cloud as Cloud/Network

            SUMO->>Agent: Vehicle Positions & Density
            Agent->>LSTM: Request Traffic Prediction
            LSTM-->>Agent: Predicted Hotspots (t+1)
            
            par Strategic Control
                Agent->>Agent: DDQN: Optimize Fleet Size
            and Tactical Control
                Agent->>Agent: MADDPG: Update Velocities
            end
            
            Agent->>SUMO: Apply UAV Movements
            Agent->>Cloud: Report Cache Hits/Misses
            Cloud-->>Agent: Reward Signal (Profit)
        `,
        color: "cyan",
        status: "Simulation Study",
        links: {
            github: "https://github.com/Rudra-Garg/UAV",
            report: "/reports/UAV.pdf",
        }
    },
    {
        id: "fog-computing",
        title: "Fog Computing Testbed",
        subtitle: "Gateway Validation Module Placement (GVMP)",
        description:
            "A 4-tier distributed Fog Computing virtual testbed built with Docker to evaluate IoT application placement strategies. The study validates the 'GVMP' heuristic, which prioritizes horizontal resource sharing (sibling nodes) over vertical cloud offloading, using realistic network emulation.",
        metrics: [
            { label: "Network Reduction", value: "95%" },
            { label: "Edge Latency", value: "~16ms" },
            { label: "Cloud Latency", value: "~5600ms" },
        ],
        techStack: [
            "Docker Compose",
            "Linux Traffic Control (tc)",
            "Prometheus/Grafana",
            "Python (Flask)",
            "Redis"
        ],
        decisions: [
            {
                decision: "Sibling-Aware Placement",
                tradeoff: "Search Latency vs. Bandwidth",
                outcome:
                    "Validating resources on neighbor nodes via the gateway reduced core network usage by 95% compared to standard Edge-Ward placement.",
            },
            {
                decision: "Kernel-Level Emulation",
                tradeoff: "Setup Complexity vs. Realism",
                outcome:
                    "Used Linux 'tc' and 'netem' within containers to inject real jitter/packet loss, proving the strategy holds up under degraded network conditions.",
            },
            {
                decision: "Cgroup Monitoring",
                tradeoff: "Implementation Effort vs. Accuracy",
                outcome:
                    "Built custom monitors reading /sys/fs/cgroup to calculate normalized CPU load, ensuring accurate performance metrics across heterogeneous node types.",
            },
        ],
        architecture: `
        graph BT
            subgraph Cloud_Tier [Cloud Layer]
                Cloud[Cloud Datacenter]
            end
            
            subgraph Proxy_Tier [Proxy Layer]
                Proxy[Regional Proxy] --> Cloud
            end
            
            subgraph Gateway_Tier [Gateway Layer]
                GW[Gateway Device] --> Proxy
            end
            
            subgraph Edge_Tier [Edge Layer]
                M1[Mobile 1] --> GW
                M2[Mobile 2] --> GW
                M3[Mobile 3] --> GW
            end

            %% Logic Flow
            Task1[Task from M1] -.->|1. Try Local| M1
            Task1 -.->|2. Check Sibling| M2
            Task1 -.->|3. Failover| Proxy
            
            style M1 fill:#10b981,stroke:#047857,color:white
            style M2 fill:#10b981,stroke:#047857,color:white
            style Cloud fill:#ef4444,stroke:#b91c1c,color:white
            style Cloud_Tier fill:#1e293b,stroke:#10b981,stroke-width:2px
        `,
        color: "emerald",
        status: "Testbed Validated",
        links: {
            github: "https://github.com/Rudra-Garg/CS300",
            report: "/reports/Docker.pdf",
        }
    },
];

export default function ResearchPage() {
    return (
        <>
            <Navbar />
            <main className="relative min-h-screen pt-16">
                <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
                <div className="relative">
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
                </div>
            </main>
            <div className="relative z-10 bg-[#FAFBFC] dark:bg-[#0B0F14] transition-colors duration-300">
                <Footer />
            </div>
        </>
    );
}
