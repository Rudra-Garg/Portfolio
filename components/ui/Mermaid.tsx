"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MermaidProps {
  chart: string;
  className?: string;
}

// Helper component to trigger resetTransform when SVG changes
function ResetOnSvgChange({ svg, resetTransform }: { svg: string; resetTransform: () => void }) {
  useEffect(() => {
    if (svg) {
      const timer = setTimeout(() => resetTransform(), 50);
      return () => clearTimeout(timer);
    }
  }, [svg, resetTransform]);
  return null;
}

export function Mermaid({ chart, className }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();
  // Generate a new unique ID for each render to avoid Mermaid ID conflicts
  const renderCount = useRef(0);

  useEffect(() => {
    // Initialize Mermaid with config to allow resizing
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "var(--font-mono)",
      logLevel: 5,
    });

    const renderChart = async () => {
      try {
        // Use a unique ID for each render call
        renderCount.current += 1;
        const uniqueId = `mermaid-${Date.now()}-${renderCount.current}`;

        // Use mermaid.render to generate SVG string
        const { svg } = await mermaid.render(uniqueId, chart);

        // Remove fixed width/height attributes from SVG to allow proper scaling
        // Use viewBox + preserveAspectRatio for responsive scaling
        // Only modify the opening <svg> tag, not internal elements
        const processedSvg = svg.replace(
          /<svg([^>]*)>/i,
          (match, attrs) => {
            // Remove width, height, and style attributes from root SVG only
            const newAttrs = attrs
              .replace(/\s+width="[^"]*"/gi, "")
              .replace(/\s+height="[^"]*"/gi, "")
              .replace(/\s+style="[^"]*"/gi, "");

            return `<svg${newAttrs} preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto; display:block;">`;
          }
        );

        setSvg(processedSvg);
      } catch (error) {
        console.error("Mermaid render error:", error);
        setSvg(`<div class="text-red-500 font-mono text-sm p-4 border border-red-500 rounded">Failed to render diagram.</div>`);
      }
    };

    renderChart();
  }, [chart, resolvedTheme]);

  return (
    <div className={cn("relative w-full h-[500px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", className)}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <ResetOnSvgChange svg={svg} resetTransform={resetTransform} />
            {/* Control Panel */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-sm">
              <button
                onClick={() => zoomIn()}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Diagram Canvas */}
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%", cursor: "grab" }}
              contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Footer Label */}
      <div className="absolute bottom-3 left-4 px-2 py-1 rounded bg-white/50 dark:bg-black/20 text-[10px] font-mono text-slate-400 pointer-events-none uppercase tracking-wider">
        Interactive Architecture
      </div>
    </div>
  );
}