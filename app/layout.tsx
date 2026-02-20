import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tugas Tracker",
  description:
    "A student productivity app to track courses, tasks, and deadlines — built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: "var(--md-surface-container-high)",
              color: "var(--md-on-surface)",
              border: "1px solid var(--md-outline-variant)",
              borderRadius: "16px",
            },
          }}
        />
        <div className="flex min-h-screen flex-col bg-md-surface text-md-on-surface transition-colors duration-300">
          <SiteHeader />
          <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
