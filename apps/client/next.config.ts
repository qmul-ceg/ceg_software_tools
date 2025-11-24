import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  /* config options here */
   output : isProd ?'export': undefined,
   images: {
      unoptimized: true,
   },
   eslint : {
      ignoreDuringBuilds: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },

   webpackDevMiddleware : config => {
      config.watchOptions = {
         poll:300,
         aggregateTimeout: 200,
      };
      return config
   }

};

export default nextConfig;
