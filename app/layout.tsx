import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudra Garg | Backend Engineer | Distributed Systems & Applied AI",
  description:
    "Building production backend systems, cloud infrastructure, and privacy-first AI applications. Research in Fog Computing, UAV Edge Networks, and NLP.",
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
    title: "Rudra Garg | Backend Engineer | Distributed Systems & Applied AI",
    description:
      "Building production backend systems, cloud infrastructure, and privacy-first AI applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-[#0B0F14] text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}