import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const tempDir = mkdtempSync(join(tmpdir(), 'time-chainer-'));

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: packageRoot,
    stdio: 'inherit',
    ...options,
  });
}

try {
  const packJson = run(
    npm,
    ['pack', '--json', '--loglevel=error', '--pack-destination', tempDir],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
  );
  const [pack] = JSON.parse(packJson);
  const tarball = join(tempDir, pack.filename);
  const packedFiles = new Set(pack.files.map((file) => file.path));

  for (const required of [
    'package.json',
    'README.md',
    'LICENSE',
    'dist/index.cjs',
    'dist/index.d.cts',
    'dist/index.d.ts',
    'dist/index.js',
    'dist/index.umd.js',
  ]) {
    if (!packedFiles.has(required)) {
      throw new Error(`Packed package is missing ${required}`);
    }
  }

  const appDir = join(tempDir, 'app');
  mkdirSync(appDir);
  writeFileSync(
    join(appDir, 'package.json'),
    JSON.stringify({ name: 'smoke-test', private: true, type: 'module' }),
  );
  run(
    npm,
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--no-package-lock',
      '--loglevel=error',
      tarball,
    ],
    { cwd: appDir },
  );

  const dist = join(appDir, 'node_modules', 'time-chainer', 'dist');

  writeFileSync(
    join(appDir, 'types.ts'),
    `
import Time, { Time as NamedTime } from 'time-chainer';

const milliseconds: number = Time.seconds(1);
const constructed: NamedTime = new Time(500);
const named: Time = new NamedTime(500);

console.log(milliseconds, constructed, named);
`,
  );
  run(
    process.execPath,
    [
      join(packageRoot, 'node_modules', 'typescript', 'bin', 'tsc'),
      '--noEmit',
      '--strict',
      '--target',
      'ES2020',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--skipLibCheck',
      'false',
      join(appDir, 'types.ts'),
    ],
    { cwd: appDir },
  );

  writeFileSync(
    join(appDir, 'esm.mjs'),
    `
import Time, { Time as NamedTime } from 'time-chainer';

if (Time !== NamedTime) throw new Error('ESM default/named exports differ');
if (+Time.seconds(1) !== 1000) throw new Error('ESM value mismatch');
if (!(Time.seconds(1) instanceof Time)) throw new Error('ESM instance mismatch');
`,
  );
  run(process.execPath, [join(appDir, 'esm.mjs')], { cwd: appDir });

  writeFileSync(
    join(appDir, 'cjs.cjs'),
    `
const pkg = require('time-chainer');

if (pkg.default !== pkg.Time) throw new Error('CJS default/named exports differ');
if (+pkg.default.seconds(1) !== 1000) throw new Error('CJS value mismatch');
`,
  );
  run(process.execPath, [join(appDir, 'cjs.cjs')], { cwd: appDir });

  const context = {};
  context.globalThis = context;
  context.self = context;
  createContext(context);
  runInContext(readFileSync(join(dist, 'index.umd.js'), 'utf8'), context);

  const umdTime = context.timeMaker?.default;
  if (!umdTime) throw new Error('UMD global timeMaker.default is missing');
  if (context.timeMaker.Time !== umdTime) {
    throw new Error('UMD default/named exports differ');
  }
  if (+umdTime.seconds(1) !== 1000) throw new Error('UMD value mismatch');

  for (const file of ['index.d.ts', 'index.d.cts']) {
    const declaration = readFileSync(join(dist, file), 'utf8');
    const match = declaration.match(/^\/\/# sourceMappingURL=(.+)$/m);

    if (match && !existsSync(join(dist, match[1]))) {
      throw new Error(`${file} references missing ${match[1]}`);
    }
  }

  console.log(`Verified ${pack.filename}`);
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
