/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/personal-info",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
