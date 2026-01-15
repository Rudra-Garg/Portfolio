"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-200/50" />
        );
    }

    const cycleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("system");
        } else {
            setTheme("dark");
        }
    };

    return (
        <motion.button
            onClick={cycleTheme}
            className={cn(
                "relative p-2 rounded-lg transition-all",
                "text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400",
                "hover:bg-slate-200/50 dark:hover:bg-slate-800/50",
                "border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Current theme: ${theme}. Click to change.`}
            title={`Theme: ${theme}`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: resolvedTheme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "system" ? (
                    <Monitor className="w-5 h-5" />
                ) : resolvedTheme === "dark" ? (
                    <Moon className="w-5 h-5" />
                ) : (
                    <Sun className="w-5 h-5" />
                )}
            </motion.div>
        </motion.button>
    );
}
