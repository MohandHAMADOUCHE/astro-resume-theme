// Minimal shim to satisfy editor when 'astro:assets' types are not picked up
declare module 'astro:assets' {
  export const Image: any;
}
