/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare global {
  const puter: {
    ai: {
      chat: (prompt: string, options?: { model?: string }) => Promise<{ message: { content: string } }>
      txt2img: (prompt: string) => Promise<HTMLImageElement>
    }
  }
}
export {}
