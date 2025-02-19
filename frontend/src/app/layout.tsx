import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppAppBar from "./blog-base/components/AppAppBar";
import Footer from "./blog-base/components/Footer";
import AppTheme from "./shared-theme/AppTheme";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kristen Loves Cookies",
  description: "Delicious recipes & baked goods!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"/>
    <AppTheme>
      <AppAppBar/>
      <main>{children}</main>
      <Footer/>
    </AppTheme>
    </body>
    </html>
  );
}
