import { NextConfig } from "next";
// import { join } from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/i,
    //   issuer: { and: [/\.(js|ts)x?$/] },
    //   use: ["@svgr/webpack"],
    // });
    return config;
  },
};

export default nextConfig;
