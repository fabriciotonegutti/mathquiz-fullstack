/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the API rewrites for proxying to backend
  async rewrites() {
    // Use environment variable or fallback to localhost for development
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 