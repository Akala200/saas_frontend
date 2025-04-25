// src/app/layout.tsx
import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Intelligent Content Platform",
  description: "A SaaS-based AI-powered content recommendation system",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full bg-gray-50 text-gray-900 font-sans flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 w-full">
          <div className="flex justify-between items-center max-w-full px-4">
            <h1 className="text-xl font-bold">🧠 Content AI</h1>
            {/* Optional: Global nav actions */}
          </div>
        </header>

        {/* Main Content (fills remaining height) */}
        <main className="flex-grow w-full px-4 py-6 overflow-x-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t text-center text-sm text-gray-500 py-4 w-full">
          &copy; {new Date().getFullYear()} Content AI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
