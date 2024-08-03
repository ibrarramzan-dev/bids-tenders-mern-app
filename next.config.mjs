/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dn7a6o7dk",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "c5chfkpx",
    NEXT_PUBLIC_ZOHO_PWD: "ZG7vaKxiuGB6",
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
