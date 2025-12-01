import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "CS480 - Elmer F",
  description: "Product Management Application for CS480",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
