/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    BACKEND_API_ORIGIN: process.env.BACKEND_API_ORIGIN,
    BACKEND_API_STAGE: process.env.BACKEND_API_STAGE,
  },
}

module.exports = nextConfig
