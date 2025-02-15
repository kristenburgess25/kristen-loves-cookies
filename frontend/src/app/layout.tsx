import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppAppBar from "./blog-base/components/AppAppBar"; // ✅ Navbar
import Footer from "./blog-base/components/Footer"; // ✅ Footer
import AppTheme from "./shared-theme/AppTheme"; // ✅ Move Theme inside <body>

// ✅ Fonts (Keep these the same)
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

// ✅ Fix: Ensure `layout.tsx` is a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ FIX: AppTheme is a Client Component, so we move it INSIDE `body` */}
        <AppTheme>
          <AppAppBar /> {/* ✅ Navbar */}
          <main>{children}</main> {/* ✅ Page Content */}
          <Footer /> {/* ✅ Footer */}
        </AppTheme>
      </body>
    </html>
  );
}
