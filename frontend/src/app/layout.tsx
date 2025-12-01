import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Navbar";

// metadata for the browser tab
export const metadata: Metadata = {
  title: "CS480 - Amy P",
};

// root layout that wraps every page in the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* navbar shows on every page */}
        <Navbar />
        {/* actual page content goes here */}
        {children}
      </body>
    </html>
  );
}
