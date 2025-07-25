import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.svg"],
      manifest: {
        name: "Vite PWA Project",
        short_name: "Vite PWA Project",
        description: "I am a simple Vite PWA",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "icons/logo.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5174,
  },
});
