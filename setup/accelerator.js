import fs from 'fs';
import path from 'path';

const forcedUpdate = false;

/**
 * Recursive copy
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = (src, dest, overwrite) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), overwrite);
    });
  } else {
    if (overwrite || (fs.existsSync(dest) == false)) {
      fs.copyFileSync(src, dest);
    } else {
      console.log('Skipping', dest);
    }
  }
};

const workingDirectory = process.cwd();
fs.mkdirSync(path.join(workingDirectory, '/src/layouts'), { recursive: true });
fs.mkdirSync(path.join(workingDirectory, '/src/data'), { recursive: true });
fs.mkdirSync(path.join(workingDirectory, '/src/pages'), { recursive: true });

// Always Update
copyRecursiveSync('./node_modules/astro-accelerator/src/themes/', './src/themes/', true);

// More cautious updates
copyRecursiveSync('./node_modules/astro-accelerator/astro.config.mjs', './astro.config.mjs', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/.npmrc', './.npmrc', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/env.d.ts', './env.d.ts', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/tsconfig.json', './tsconfig.json', forcedUpdate);

copyRecursiveSync('./node_modules/astro-accelerator/src/config.ts', './src/config.ts', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/src/layouts/', './src/layouts/', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/src/data/', './src/data/', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/public/', './public/', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/sample/src/pages/', './src/pages/', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/src/pages/search.md', './src/pages/search.md', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/src/pages/search.json.ts', './src/pages/search.json.ts', forcedUpdate);
copyRecursiveSync('./node_modules/astro-accelerator/src/pages/sitemap.xml.ts', './src/pages/sitemap.xml.ts', forcedUpdate);

copyRecursiveSync(
  './node_modules/astro-accelerator/src/pages/articles/',
  // You can change the destination below from "articles" to something else, like blog
  './src/pages/articles/',
  forcedUpdate
);

copyRecursiveSync(
  './node_modules/astro-accelerator/src/pages/authors/',
  // You can change the destination below from "articles" to something else, like blog
  './src/pages/authors/',
  forcedUpdate
);

copyRecursiveSync(
  './node_modules/astro-accelerator/src/pages/category/',
  // You can change the destination below from "category" to something else, like interest
  './src/pages/category/',
  forcedUpdate
);

copyRecursiveSync(
  './node_modules/astro-accelerator/src/pages/tag/',
  // You can change the destination below from "tag" to something else, like label
  './src/pages/tag/',
  forcedUpdate
);