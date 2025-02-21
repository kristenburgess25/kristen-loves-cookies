import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ Helps catch potential issues
  output: "standalone", // ✅ Supports both "use client" and SSR
  trailingSlash: false, // ✅ Helps with routing issues
  };

export default nextConfig;
