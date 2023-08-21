/** @type {import('next').NextConfig} */
import('next').NextConfig
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  serverOptions: {
    // Enable HTTPS by providing key and certificate
    key: 'certificates/key.pem', 
    cert: 'certificates/certificate.pem', 
  },
};

module.exports = nextConfig
