/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `https://www.fingerorder.ga/api/:path*`,
            },
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
    },
    images: {
        imageSizes: [200],
    },
};

export default nextConfig;
