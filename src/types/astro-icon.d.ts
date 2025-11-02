declare module 'astro-icon/components' {
  import type { AstroFactory } from 'astro/runtime/server/index.js';
  export interface Props {
    name: string;
    class?: string;
    className?: string;
    [key: string]: any;
  }
  export const Icon: AstroFactory<Props>;
}
