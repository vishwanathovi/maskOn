import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    outDir: "src/server/build",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/model": "http://localhost:8080",
    },
  },
  resolve: {
    alias: {
      "@tensorflow/tfjs-core": path.resolve(
        __dirname,
        "node_modules/@tensorflow/tfjs-core"
      ),
    },
  },
  define: {
    "process.env": {},
  },
});
