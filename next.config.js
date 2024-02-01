require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
           {
            protocol: "https",
            hostname: "images.pexels.com"
           },
           {
            protocol: "https",
            hostname: "miro.medium.com"
           }
        ]
    }
}

module.exports = nextConfig
