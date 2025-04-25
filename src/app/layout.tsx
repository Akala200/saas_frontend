import "@/styles/globals.css";
import { ReactNode } from "react";
import ClientHeader from "@/components/layout/ClientHeader"; // Create this file
import Link from "next/link";

export const metadata = {
  title: "Intelligent Content Platform",
  description: "A SaaS-based AI-powered content recommendation system",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full bg-gray-50 text-gray-900 font-sans flex flex-col">
        <ClientHeader />
        <main className="flex-grow w-full px-4 py-6 overflow-x-auto">{children}</main>
        <footer className="bg-white border-t text-center text-sm text-gray-500 py-4 w-full">
          &copy; {new Date().getFullYear()} Content AI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
