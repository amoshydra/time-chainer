import { appendFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const summaryPath = join(root, 'coverage', 'coverage-summary.json');
const summary = JSON.parse(await readFile(summaryPath, 'utf8'));
const metrics = ['lines', 'statements', 'functions', 'branches'];
const rows = metrics.map((metric) => {
  const value = summary.total[metric];
  return `| ${metric} | ${value.covered} | ${value.total} | ${value.pct}% |`;
});
const table = [
  '## Coverage',
  '',
  '| Metric | Covered | Total | Percent |',
  '| --- | ---: | ---: | ---: |',
  ...rows,
  '',
].join('\n');

console.log(table);

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, table);
}
