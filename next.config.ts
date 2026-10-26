import type { NextConfig } from "next";
import { FLYER_HOSTS } from "./src/lib/images";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: FLYER_HOSTS.map(hostname => ({ protocol: "https" as const, hostname })),
    qualities: [75],
    // flyers rarely change; keep resized copies a month to stay well inside
    // the Hobby plan's image transformation quota
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      // events index merged into the homepage; detail pages stay at /events/[slug]
      { source: "/events", destination: "/", permanent: true },
      // guide page retired in the reshape
      { source: "/guide", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
