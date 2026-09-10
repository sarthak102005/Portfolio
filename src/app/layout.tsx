import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarthak Makkar — Backend / Full Stack / GenAI Engineer",
  description:
    "Portfolio of Sarthak Makkar — backend and full-stack engineer building production-grade systems with reliability patterns and applied AI. Explore deployed projects including email scheduling, earned wage access, multi-agent extraction, and RAG pipelines.",
  keywords: [
    "Sarthak Makkar",
    "Backend Engineer",
    "Full Stack Developer",
    "GenAI",
    "Portfolio",
    "Node.js",
    "FastAPI",
    "React",
    "Next.js",
    "RAG",
    "LLM",
  ],
  authors: [{ name: "Sarthak Makkar" }],
  openGraph: {
    title: "Sarthak Makkar — Backend / Full Stack / GenAI Engineer",
    description:
      "Production-grade systems and AI applications. Deployed projects with live demos.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak Makkar — Backend / Full Stack / GenAI Engineer",
    description:
      "Production-grade systems and AI applications. Deployed projects with live demos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <div className="scanline-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
