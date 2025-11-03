// Ensure TS knows about import.meta.glob in the editor (vite provides actual runtime)
interface ImportMeta {
  glob: (pattern: string, options?: { eager?: boolean; as?: string; import?: string }) => Record<string, any>;
}
