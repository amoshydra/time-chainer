import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const declarations = (await readdir(dist)).filter(
  (file) => file.endsWith('.d.ts') || file.endsWith('.d.cts'),
);

for (const file of declarations) {
  const path = join(dist, file);
  const source = await readFile(path, 'utf8');
  const stripped = source.replace(/^\/\/# sourceMappingURL=.*\r?\n?/gm, '');

  if (stripped !== source) {
    await writeFile(path, stripped);
  }
}
