import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudra Garg | Systems Researcher & Full-Stack Engineer",
  description:
    "Bridging the gap between academic theory and production reality. Systems research in Fog Computing, UAV Networks, and AI/ML, with production engineering in Next.js, Go, and distributed systems.",
  keywords: [
    "Systems Research",
    "Full-Stack Engineer",
    "Fog Computing",
    "UAV Networks",
    "Edge Computing",
    "LSTM",
    "Reinforcement Learning",
    "Next.js",
    "Go",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: "Rudra Garg" }],
  openGraph: {
    title: "Rudra Garg | Systems Researcher & Full-Stack Engineer",
    description:
      "Bridging the gap between academic theory and production reality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B0F14] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
