import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Un package-lock.json traîne dans le dossier personnel : on fixe la racine.
  turbopack: { root: __dirname },
};

export default nextConfig;
