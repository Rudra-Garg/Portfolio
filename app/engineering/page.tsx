import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { EngineeringHero, ProjectBento, ProjectTerminal } from "./components";

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
        subtitle: "Real-time Chess Variant with Recursive Logic",
        description:
            "A complex chess variant featuring portal mechanics that allow pieces to teleport across the board. The engine handles recursive move validation to prevent infinite loops during portal traversal, synchronized in real-time via Firebase.",
        features: [
            "Recursive move validation algorithm for portal traversal",
            "Optimistic UI updates with Firebase transactions",
            "P2P Voice Chat using WebRTC (PeerJS) signaling",
            "Automated ELO calculation via Cloud Functions",
        ],
        techStack: [
            { name: "React", category: "Frontend" },
            { name: "Firebase", category: "Real-time DB" },
            { name: "FastAPI", category: "Backend" },
            { name: "PeerJS", category: "WebRTC" },
            { name: "Docker", category: "DevOps" },
        ],
        metrics: [
            { label: "Test Coverage", value: "15+ Suites" },
            { label: "Latency", value: "<100ms" },
            { label: "Voice Quality", value: "P2P HD" },
        ],
        color: "orange",
        links: {
            demo: "#", // Add link if available
            github: "https://github.com/Rudra-Garg/portal-gambit",
        },
        image: "/projects/portal-gambit.png",
        codeSnippet: `// CustomChessEngine.js: Handling "Simultaneous Existence"
moves({ square, verbose, visited } = {}) {
  // Prevent infinite recursion in portal loops
  if (!visited) visited = { portals: new Set(), simulChecked: new Set() };
  
  const isOnPortal = this.portals[square] !== undefined;
  if (isOnPortal && !visited.simulChecked.has(square)) {
    visited.hasTraversedPortal = true; 
    const linkedSquare = this.portals[square].linkedTo;
    
    // Virtual move: Place piece at exit to calculate potential captures
    const tempPiece = { ...this.get(square) };
    this.put(tempPiece, linkedSquare);
    
    // Recursive call from the new perspective
    const linkedMoves = super.moves({ square: linkedSquare, verbose: true });
    // ... merge moves and restore board state ...
  }
}`
    },
    {
        id: "terraquest",
        title: "TerraQuest",
        subtitle: "High-Concurrency Geo-Gaming Platform",
        description:
            "A competitive geography game built with Go. Features a high-performance worker pool for ingesting and validating 81,000+ global locations concurrently, ensuring a massive dataset for multiplayer lobbies.",
        features: [
            "Concurrent data ingestion using Go Worker Pools",
            "Atomic counters for thread-safe statistics",
            "WebSocket lobbies with mutex-locked state management",
            "Geodesic distance calculation for scoring",
        ],
        techStack: [
            { name: "Go (Gin)", category: "Backend" },
            { name: "Vue 3", category: "Frontend" },
            { name: "PostgreSQL", category: "Database" },
            { name: "Gorilla WS", category: "Real-time" },
            { name: "GORM", category: "ORM" },
        ],
        metrics: [
            { label: "Locations", value: "81,000+" },
            { label: "Concurrency", value: "Worker Pool" },
            { label: "Lobby Size", value: "8 Players" },
        ],
        color: "emerald",
        links: {
            demo: "#",
            github: "https://github.com/Rudra-Garg/TerraQuest",
        },
        image: "/projects/terraquest.png",
        codeSnippet: `// populate_locations.go: Worker Pool Pattern
for i := 0; i < *workerCount; i++ {
    workerWg.Add(1)
    go func(workerID int) {
        defer workerWg.Done()
        for candidate := range jobs {
            atomic.AddInt32(&totalProcessed, 1)
            // Validate via Google Street View API
            if dbErr := workerBatch.Add(newLocation); dbErr != nil {
                atomic.AddInt32(&totalErrors, 1)
            } else {
                atomic.AddInt32(&totalValidated, 1)
            }
        }
    }(i)
}
// Feed jobs to buffered channel
for i := 0; i < numToProcess; i++ { jobs <- allCandidates[i] }`
    },
    {
        id: "grig-internship",
        title: "GRIG Technologies",
        subtitle: "Backend Optimization & Microservices",
        description:
            "Optimized certificate generation pipeline by implementing asynchronous processing. Migrated legacy endpoints to a scalable microservice architecture using Flask and Firebase, resulting in a 98.3% reduction in processing time.",
        features: [
            "Async processing for PDF generation tasks",
            "Microservice architecture for alerts (FastAPI)",
            "Supabase object storage evaluation and prototype",
            "CI/CD pipelines with GitHub Actions",
        ],
        techStack: [
            { name: "Python", category: "Backend" },
            { name: "Flask", category: "API" },
            { name: "Firebase", category: "Database" },
            { name: "Kubernetes", category: "Orchestration" },
            { name: "Supabase", category: "Storage" },
        ],
        metrics: [
            { label: "Time Reduction", value: "98.3%" },
            { label: "Data Efficiency", value: "+40%" },
            { label: "APIs Built", value: "10+" },
        ],
        color: "cyan",
        links: {
            case_study: "#",
        },
        image: "/projects/grig.png",
        codeSnippet: `# Flask-RESTx API Structure (Architectural Sample)
@api.route('/certificates/generate')
class CertificateGeneration(Resource):
    @api.expect(cert_model)
    def post(self):
        """Async generation trigger"""
        data = request.json
        # Offload heavy PDF rendering to worker queue
        task_id = async_worker.enqueue(
            render_certificate, 
            user_id=data['uid'], 
            template=data['template']
        )
        return {'task_id': task_id, 'status': 'processing'}, 202`
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
                        <div className="space-y-24">
                            {projects.map((project, index) => (
                                <div key={project.id} className="space-y-8">
                                    <ProjectBento
                                        project={project}
                                        index={index}
                                        reverse={index % 2 === 1}
                                    />
                                    {/* Terminal for Code Evidence */}
                                    <div className="max-w-4xl mx-auto">
                                        <ProjectTerminal 
                                            title={project.title}
                                            code={project.codeSnippet}
                                            language={project.id === "terraquest" ? "go" : project.id === "grig-internship" ? "python" : "javascript"}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}