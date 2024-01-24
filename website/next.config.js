const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ["lab.basement.studio", "drive.proton.me"],
  },
  rewrites: async () => [
    {
      source: "/:path*",
      destination: `/:path*`,
    },
    {
      source: "/docs",
      destination: `${process.env.NEXT_PUBLIC_DOCS_URL || ''}/docs`, // Use empty string if undefined
    },
    {
      source: "/docs/:path*",
      destination: `${process.env.NEXT_PUBLIC_DOCS_URL || ''}/docs/:path*`, // Use empty string if undefined
    },
  ],
};

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
  ];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
