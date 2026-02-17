"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui";
import {
    Menu,
    X,
    Cpu,
    FlaskConical,
    Wrench,
    User,
    Mail,
    FileText,
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        width={24}
        height={24}
    >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        width={24}
        height={24}
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const navigation = [
    { name: "Research", href: "/research", icon: FlaskConical },
    { name: "Engineering", href: "/engineering", icon: Wrench },
    { name: "The Kernel", href: "/about", icon: User },
];

const socials = [
    { name: "GitHub", href: "https://github.com/rudra-garg", icon: GithubIcon },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "LinkedIn", href: "https://linkedin.com/in/rudra-garg", icon: LinkedinIcon },
    { name: "Email", href: "mailto:hi@rudragarg.dev", icon: Mail },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-[#FAFBFC]/80 dark:bg-[#0B0F14]/80 backdrop-blur-xl",
                scrolled
                    ? "border-slate-200/50 dark:border-slate-800/50 py-3"
                    : "border-transparent py-5"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group"
                >
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl liquid-glass group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                        <Cpu className="w-5 h-5 text-slate-700 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <span className="font-mono font-bold text-xl tracking-tighter text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                        RG
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative px-4 py-2 text-xs font-mono font-medium tracking-widest uppercase text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors group overflow-hidden rounded-lg"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-4 pr-6 border-r border-slate-200 dark:border-slate-800">
                        {socials.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors transform hover:-translate-y-0.5"
                                aria-label={item.name}
                            >
                                <item.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden absolute top-full left-0 right-0 bg-[#FAFBFC] dark:bg-[#0B0F14] border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col h-full liquid-glass border-0 rounded-none">
                            <div className="p-6 space-y-2">
                                {navigation.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-4 px-4 py-4 text-sm font-mono uppercase tracking-widest text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <item.icon className="w-5 h-5 text-cyan-500" />
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto p-8 border-t border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">Connect</h4>
                                <div className="flex gap-8">
                                    {socials.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="p-3 liquid-glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                                        >
                                            <item.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export function Footer() {
    return (
        <footer className="relative py-24 border-t border-slate-200/80 dark:border-slate-800/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Left: Name (Larger) */}
                    <div className="flex-1">
                        <Link href="/" className="inline-block group">
                            <h2 className="font-mono font-bold text-4xl md:text-5xl text-slate-800 dark:text-slate-100 mb-4 tracking-tighter group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                                Rudra Garg
                            </h2>
                        </Link>
                        <p className="text-base text-slate-600 dark:text-slate-400 max-w-sm font-light leading-relaxed">
                            Systems Researcher & Full-Stack Engineer.<br />
                            Bridging theory and production.
                        </p>
                    </div>

                    {/* Right: Navigation & Connect */}
                    <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
                        {/* Navigation */}
                        <div>
                            <h3 className="font-mono text-xs font-semibold text-cyan-700 dark:text-cyan-500 uppercase tracking-widest mb-6">
                                Explore
                            </h3>
                            <ul className="space-y-4">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-500 transition-colors" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h3 className="font-mono text-xs font-semibold text-cyan-700 dark:text-cyan-500 uppercase tracking-widest mb-6">
                                Connect
                            </h3>
                            <ul className="space-y-4">
                                {socials.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <item.icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-20 pt-8 border-t border-slate-200/80 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-600 font-mono">
                        © {new Date().getFullYear()} Rudra Garg. <span className="hidden sm:inline">All rights reserved.</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-600 font-mono flex items-center gap-2">
                        <span>Built with Next.js</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span>Tailwind</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span>Framer Motion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
