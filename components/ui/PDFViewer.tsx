"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, FileText, Maximize2 } from "lucide-react";

interface PDFViewerProps {
    file: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export function PDFViewer({ file, title, isOpen, onClose }: PDFViewerProps) {
    // Close on Escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
                    >
                        {/* Header bar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/95">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/30 flex-shrink-0">
                                    <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                        {title}
                                    </h2>
                                    <p className="text-xs font-mono text-slate-500 truncate">
                                        {file}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                <a
                                    href={file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Full Screen</span>
                                </a>
                                <a
                                    href={file}
                                    download
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Download</span>
                                </a>
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Browser chrome bar */}
                        <div className="h-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                            </div>
                            <div className="ml-3 flex-1 flex items-center gap-2 h-5 px-3 rounded-md bg-slate-100 dark:bg-slate-800/50 text-xs font-mono text-slate-400 truncate">
                                <FileText className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{file}</span>
                            </div>
                        </div>

                        {/* PDF iframe */}
                        <div className="flex-1 bg-slate-100 dark:bg-slate-950">
                            <iframe
                                src={file}
                                className="w-full h-full"
                                title={title}
                                style={{ border: "none" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/** Hook to manage PDF viewer state */
export function usePDFViewer() {
    const [viewer, setViewer] = useState<{ file: string; title: string } | null>(null);

    const openPDF = useCallback((file: string, title: string) => {
        setViewer({ file, title });
    }, []);

    const closePDF = useCallback(() => {
        setViewer(null);
    }, []);

    return { viewer, openPDF, closePDF };
}
