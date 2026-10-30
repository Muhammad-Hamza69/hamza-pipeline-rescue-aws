import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  title: "Muhammad Hamza Siddiqui — Cloud Data & AI Engineer",
  description:
    "Cloud Data & AI Engineer specializing in real-time data pipelines, cloud-native architectures, and production-ready analytics platforms. Based in Karachi, Pakistan.",
  keywords: [
    "Data Engineer",
    "AI Engineer",
    "Cloud Engineer",
    "AWS",
    "Snowflake",
    "Airflow",
    "Python",
    "ETL",
    "Karachi",
  ],
  authors: [{ name: "Muhammad Hamza Siddiqui" }],
  openGraph: {
    title: "Muhammad Hamza Siddiqui — Cloud Data & AI Engineer",
    description:
      "I turn raw data into intelligent, production-ready AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <noscript><style>{'[style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }'}</style></noscript>
        {children}
      </body>
    </html>
  );
}
