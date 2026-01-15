"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    size: number;
    targetSize: number;
}

const SPACING = 30;
const CONNECTION_DISTANCE = SPACING * 1.5;
const MOUSE_RADIUS = 200;
const SPRING_STIFFNESS = 0.05;
const FRICTION = 0.90;

export function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    const initPoints = useCallback((width: number, height: number) => {
        const points: Point[] = [];
        const cols = Math.ceil(width / SPACING) + 2;
        const rows = Math.ceil(height / SPACING) + 2;

        const offsetX = (width - (cols - 1) * SPACING) / 2;
        const offsetY = (height - (rows - 1) * SPACING) / 2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = offsetX + i * SPACING;
                const y = offsetY + j * SPACING;
                points.push({
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    baseX: x,
                    baseY: y,
                    size: 1.5,
                    targetSize: 1.5
                });
            }
        }
        return points;
    }, []);

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            ctx.clearRect(0, 0, width, height);

            const points = pointsRef.current;
            const mouse = mouseRef.current;
            const isDark = document.documentElement.classList.contains('dark');

            // Physics & Updates
            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const forceDirectionX = dx / dist;
                    const forceDirectionY = dy / dist;
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const moveX = -forceDirectionX * force * 5;
                    const moveY = -forceDirectionY * force * 5;

                    p.vx += moveX;
                    p.vy += moveY;
                    p.targetSize = 3.5;
                } else {
                    p.targetSize = 1.5;
                }

                const springX = (p.baseX - p.x) * SPRING_STIFFNESS;
                const springY = (p.baseY - p.y) * SPRING_STIFFNESS;

                p.vx += springX;
                p.vy += springY;
                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.x += p.vx;
                p.y += p.vy;
                p.size += (p.targetSize - p.size) * 0.1;
            }

            // Draw Connections (Blueprint Style for Light Mode)
            ctx.beginPath();
            // Light: Darker Slate Blue (Engineering look) | Dark: Faint Cyan
            ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(71, 85, 105, 0.15)";
            ctx.lineWidth = 0.5;

            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;

                    if (Math.abs(dx) > CONNECTION_DISTANCE || Math.abs(dy) > CONNECTION_DISTANCE) continue;

                    const distSq = dx * dx + dy * dy;
                    if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                }
            }
            ctx.stroke();

            // Draw Nodes
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                ctx.beginPath();
                if (p.size > 2) {
                    ctx.fillStyle = isDark
                        ? `rgba(56, 189, 248, ${0.4 + (p.size - 1.5) / 5})`
                        : `rgba(2, 132, 199, ${0.5 + (p.size - 1.5) / 5})`; // Sky-600 in Light
                } else {
                    ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.3)";
                }
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            pointsRef.current = initPoints(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        }

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        resizeCanvas();

        const animate = () => {
            if (canvas) {
                draw(ctx, canvas.width, canvas.height);
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initPoints, draw]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: "100vw", height: "100vh" }}
        />
    );
}

export const NetworkCanvas = NetworkBackground;

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 pointer-events-none">
            {/* Cleaner Gradient Overlay - Removed heavy 'via-white' fog */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFFFFF] dark:via-transparent dark:to-[#0B0F14]/90 transition-colors duration-300" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-slate-200 dark:border-cyan-500/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm dark:shadow-none transition-colors duration-300">
                        <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-cyan-400 animate-pulse" />
                        <span className="font-mono text-sm text-slate-700 dark:text-cyan-400 font-medium">
                            systems.init()
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-slate-900 dark:text-slate-100">Rudra</span>{" "}
                        <span className="text-gradient">Garg</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-400 mb-8 font-medium">
                        Systems Researcher & Full-Stack Engineer
                    </p>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Bridging the gap between{" "}
                        <span className="text-sky-700 dark:text-cyan-400 font-semibold">academic theory</span> and{" "}
                        <span className="text-sky-700 dark:text-cyan-400 font-semibold">production reality</span>
                    </p>

                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <a
                            href="/research"
                            className="group relative px-6 py-3 font-medium text-white bg-sky-700 dark:bg-cyan-600 rounded-lg overflow-hidden transition-all hover:bg-sky-600 dark:hover:bg-cyan-500 shadow-lg shadow-sky-900/20 dark:shadow-cyan-900/20"
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
                            className="group px-6 py-3 font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg transition-all hover:border-sky-600 dark:hover:border-cyan-500/50 hover:text-sky-700 dark:hover:text-cyan-400 bg-white/50 dark:bg-transparent"
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

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600">
                        <span className="text-[10px] font-mono uppercase tracking-widest">Initialize Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-sky-600/30 dark:from-cyan-500/50 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}