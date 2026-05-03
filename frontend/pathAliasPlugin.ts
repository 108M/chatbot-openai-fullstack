import type { BunPlugin } from "bun";
import { resolve } from "path";
import { existsSync } from "fs";

/**
 * Bun plugin to resolve TypeScript path aliases (@/* -> ./src/*)
 * 
 * This plugin is necessary because Bun's build system doesn't automatically
 * use tsconfig.json path mappings during the build process. It resolves
 * imports starting with @/ to the src/ directory.
 * 
 * Example:
 *   import { cn } from "@/lib/utils"
 *   -> resolves to -> src/lib/utils.ts
 * 
 * The plugin tries multiple file extensions (.ts, .tsx, .js, .jsx) and
 * also handles index files in directories.
 */
export const pathAliasPlugin: BunPlugin = {
  name: "path-alias-resolver",
  setup(build) {
    // Handle @/ imports by resolving them to src/
    build.onResolve({ filter: /^@\// }, (args) => {
      const relativePath = args.path.replace(/^@\//, "");
      const basePath = resolve(process.cwd(), "src", relativePath);
      
      // Try different extensions
      const extensions = [".ts", ".tsx", ".js", ".jsx"];
      for (const ext of extensions) {
        const pathWithExt = basePath + ext;
        if (existsSync(pathWithExt)) {
          return {
            path: pathWithExt,
            namespace: "file",
          };
        }
      }
      
      // Try as directory with index file
      for (const ext of extensions) {
        const indexPath = resolve(basePath, "index" + ext);
        if (existsSync(indexPath)) {
          return {
            path: indexPath,
            namespace: "file",
          };
        }
      }
      
      // If no file is found, return undefined to let Bun handle it
      // This will produce a clearer error message
      return undefined;
    });
  },
};
