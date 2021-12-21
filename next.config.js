module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com', 'lh3.googleusercontent.com'],
  },
  env: {
    AUTH0_BASE_URL: process.env.VERCEL_URL || process.env.AUTH0_BASE_URL,
  },
}
