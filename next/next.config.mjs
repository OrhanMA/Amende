/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakeimg.pl",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
