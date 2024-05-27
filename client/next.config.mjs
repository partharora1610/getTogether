import { withNextVideo } from "next-video/process"
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.freepik.com",
      "dynamic.brandcrowd.com",
      "cdn-icons-png.flaticon.com",
      "api.dicebear.com",
    ],
  },
}

export default withNextVideo(nextConfig, { folder: "y" })
