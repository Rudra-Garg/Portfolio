"use client";

import { useState } from "react";
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
    Github,
    Linkedin,
    Mail,
} from "lucide-react";

const navigation = [
    { name: "Research", href: "/research", icon: FlaskConical },
    { name: "Engineering", href: "/engineering", icon: Wrench },
    { name: "The Kernel", href: "/about", icon: User },
];

const socials = [
    { name: "GitHub", href: "https://github.com/rudra-garg", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/rudra-garg", icon: Linkedin },
    { name: "Email", href: "mailto:rudra@example.com", icon: Mail },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-[#FAFBFC]/90 dark:bg-[#0B0F14]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/50 shadow-sm dark:shadow-none transition-colors duration-300" />

            <nav className="relative max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-800 dark:text-slate-100 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                    >
                        <Cpu className="w-6 h-6 text-cyan-700 dark:text-cyan-400" />
                        <span className="font-mono font-bold text-lg">RG</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Socials & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-2">
                        {socials.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-600 dark:text-slate-500 hover:text-cyan-700 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all"
                                aria-label={item.name}
                            >
                                <item.icon className="w-5 h-5" />
                            </a>
                        ))}
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            className="p-2 text-slate-700 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden relative bg-[#FAFBFC]/98 dark:bg-[#0B0F14]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/50 transition-colors duration-300"
                    >
                        <div className="px-6 py-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 text-slate-800 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    {socials.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
                                            aria-label={item.name}
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
        <footer className="relative py-12 border-t border-slate-200/80 dark:border-slate-800/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Cpu className="w-6 h-6 text-cyan-700 dark:text-cyan-400" />
                            <span className="font-mono font-bold text-lg text-slate-800 dark:text-slate-100">
                                Rudra Garg
                            </span>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-500 max-w-xs">
                            Systems Researcher & Full-Stack Engineer. Bridging theory and
                            production.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-mono text-sm text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-600 dark:text-slate-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-mono text-sm text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <div className="flex items-center gap-3">
                            {socials.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-600 dark:text-slate-500 hover:text-cyan-700 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-all"
                                    aria-label={item.name}
                                >
                                    <item.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-500">
                        © {new Date().getFullYear()} Rudra Garg. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
                        Built with Next.js • Tailwind • Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
