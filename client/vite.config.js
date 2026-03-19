import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // adding tailwind plugin here is important if you want to use tailwindcss
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ now points to the src folder
    },
  },
});
