const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
