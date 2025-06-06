import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  theme:{
    extend:{
      container:{
        center:true,
        padding:"2rem",
        screens:{
          "xl":"1200px",
          "sm":"100%",
          "md":"100%",
          "lg":"100%",
        }
      }
    }
  }
};

export default nextConfig;
