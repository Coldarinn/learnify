import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr({
      include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
})
