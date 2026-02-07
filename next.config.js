/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Fix for modules that try to import Node.js-specific modules in the browser
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                'pino-pretty': false,
                '@react-native-async-storage/async-storage': false,
            };
        }

        return config;
    },
};

module.exports = nextConfig;
