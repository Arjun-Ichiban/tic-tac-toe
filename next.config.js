/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/tic-tac-toe',
    images: {
        unoptimized: true,
    },
    assetPrefix: '/tic-tac-toe/',
}

module.exports = nextConfig 