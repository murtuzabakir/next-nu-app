/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      domains: ["as2.ftcdn.net", "atlas-content-cdn.pixelsquid.com"],
   },
   sassOptions: {
      // This automatically injects these imports into all SCSS files
      prependData: `
        @import "./src/styles/core/_primary.scss";
        @import "./src/styles/core/_mixins.scss";
      `,
      silenceDeprecations: ["legacy-js-api"],
   }
};

export default nextConfig;
