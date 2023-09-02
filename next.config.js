/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'unsafe-url'
                    }
                ],
            },
        ]
    }
}

module.exports = nextConfig
