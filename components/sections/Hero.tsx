"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { randomBetween, lerp } from "@/lib/utils";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    type: "fog" | "uav" | "edge" | "cloud";
    connections: number[];
    pulsePhase: number;
}

interface NetworkCanvasProps {
    className?: string;
}

const NODE_COLORS = {
    fog: { fill: "rgba(56, 189, 248, 0.8)", stroke: "rgba(56, 189, 248, 1)" },
    uav: { fill: "rgba(139, 92, 246, 0.8)", stroke: "rgba(139, 92, 246, 1)" },
    edge: { fill: "rgba(16, 185, 129, 0.8)", stroke: "rgba(16, 185, 129, 1)" },
    cloud: { fill: "rgba(244, 114, 182, 0.8)", stroke: "rgba(244, 114, 182, 1)" },
};

export function NetworkCanvas({ className }: NetworkCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    const initNodes = useCallback((width: number, height: number) => {
        const nodes: Node[] = [];
        const nodeCount = Math.floor((width * height) / 25000); // Density based on canvas size
        const types: Node["type"][] = ["fog", "uav", "edge", "cloud"];

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: randomBetween(50, width - 50),
                y: randomBetween(50, height - 50),
                vx: randomBetween(-0.3, 0.3),
                vy: randomBetween(-0.3, 0.3),
                radius: randomBetween(3, 6),
                type: types[Math.floor(randomBetween(0, types.length))],
                connections: [],
                pulsePhase: randomBetween(0, Math.PI * 2),
            });
        }

        // Create connections based on proximity
        const connectionDistance = 150;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDistance && nodes[i].connections.length < 4) {
                    nodes[i].connections.push(j);
                }
            }
        }

        return nodes;
    }, []);

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
            ctx.clearRect(0, 0, width, height);

            const nodes = nodesRef.current;
            const mouse = mouseRef.current;

            // Update node positions
            for (const node of nodes) {
                // Mouse interaction - gentle repulsion
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);
                if (distToMouse < 100 && distToMouse > 0) {
                    const force = (100 - distToMouse) / 100;
                    node.vx += (dx / distToMouse) * force * 0.02;
                    node.vy += (dy / distToMouse) * force * 0.02;
                }

                // Apply velocity with damping
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.99;
                node.vy *= 0.99;

                // Add slight drift
                node.vx += randomBetween(-0.01, 0.01);
                node.vy += randomBetween(-0.01, 0.01);

                // Boundary bounce
                if (node.x < 20 || node.x > width - 20) {
                    node.vx *= -1;
                    node.x = Math.max(20, Math.min(width - 20, node.x));
                }
                if (node.y < 20 || node.y > height - 20) {
                    node.vy *= -1;
                    node.y = Math.max(20, Math.min(height - 20, node.y));
                }
            }

            // Draw connections
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                for (const j of node.connections) {
                    const target = nodes[j];
                    const dx = target.x - node.x;
                    const dy = target.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) {
                        const alpha = lerp(0.4, 0, dist / 180);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.stroke();

                        // Data packet animation along connection
                        const packetProgress = ((time * 0.001 + i * 0.5) % 2) / 2;
                        if (packetProgress < 1) {
                            const packetX = lerp(node.x, target.x, packetProgress);
                            const packetY = lerp(node.y, target.y, packetProgress);
                            ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 2})`;
                            ctx.beginPath();
                            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            }

            // Draw nodes
            for (const node of nodes) {
                const colors = NODE_COLORS[node.type];
                const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.3 + 0.7;

                // Glow effect
                const gradient = ctx.createRadialGradient(
                    node.x,
                    node.y,
                    0,
                    node.x,
                    node.y,
                    node.radius * 4
                );
                gradient.addColorStop(0, colors.fill);
                gradient.addColorStop(0.5, `rgba(56, 189, 248, ${0.1 * pulse})`);
                gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core node
                ctx.fillStyle = colors.fill;
                ctx.strokeStyle = colors.stroke;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        },
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            nodesRef.current = initNodes(rect.width, rect.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        canvas.addEventListener("mousemove", handleMouseMove);

        const animate = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            draw(ctx, rect.width, rect.height, time);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initNodes, draw]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Network Canvas */}
            <div className="absolute inset-0">
                <NetworkCanvas className="w-full h-full" />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F14]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/50 via-transparent to-[#0B0F14]/50" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Terminal-style prefix */}
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-mono text-sm text-cyan-400">
                            systems.init()
                        </span>
                    </div>

                    {/* Name */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                        <span className="text-slate-100">Rudra</span>{" "}
                        <span className="text-gradient">Garg</span>
                    </h1>

                    {/* Title */}
                    <p className="text-xl md:text-2xl text-slate-400 mb-6 font-medium">
                        Systems Researcher & Full-Stack Engineer
                    </p>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8">
                        Bridging the gap between{" "}
                        <span className="text-cyan-400">academic theory</span> and{" "}
                        <span className="text-cyan-400">production reality</span>
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <a
                            href="/research"
                            className="group relative px-6 py-3 font-medium text-slate-900 bg-cyan-400 rounded-lg overflow-hidden transition-all hover:bg-cyan-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>View Research</span>
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </a>
                        <a
                            href="/engineering"
                            className="group px-6 py-3 font-medium text-slate-300 border border-slate-700 rounded-lg transition-all hover:border-cyan-500/50 hover:text-cyan-400"
                        >
                            <span className="flex items-center gap-2">
                                <span>Engineering Work</span>
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                        <span className="text-xs font-mono">scroll</span>
                        <motion.div
                            className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center pt-2"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div className="w-1 h-2 rounded-full bg-cyan-400" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
