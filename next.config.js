/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lab.cuental.com",
        port: "",
        pathname: "/ImagesArchivo/**",
      },
      {
        protocol: "https",
        hostname: "lab.valual.com",
        port: "",
        pathname: "/ImagesArchivo/**",
      },
      {
        protocol: "https",
        hostname: "app.cuental.com",
        port: "",
        pathname: "/ImagesArchivo/**",
      },
      {
        protocol: "https",
        hostname: "app.valual.com",
        port: "",
        pathname: "/ImagesArchivo/**",
      },
      {
        protocol: "https",
        hostname: "lab.globho.com",
        port: "",
        pathname: "/ImagesArchivo/**",
      },
    ],
  },
};

module.exports = nextConfig;
