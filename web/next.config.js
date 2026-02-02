/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 1. Standard Polyfills for Web3 libraries
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false 
    };

    // 2. Ignore React Native specific modules (The Killer Fix)
    // Alias to false makes webpack ignore the import entirely
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      'react-native': false,
    };

    // 3. Mark Node.js specific libraries as externals
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
};

module.exports = nextConfig;
