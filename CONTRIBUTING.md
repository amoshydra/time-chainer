# Contributing

## Development

Development requires Node.js 24.11+ or 26+ and pnpm 10.33.2+.

```sh
pnpm install
pnpm test
pnpm run test:watch
pnpm run test:coverage
pnpm run type-check
pnpm run lint
pnpm run build
pnpm run test:package
pnpm run lint:package
pnpm run lint:types
```

`test:coverage` writes HTML and JSON coverage reports to `coverage/`. CI runs
coverage on Node 24, publishes the HTML report as an artifact, and writes a
coverage summary to the workflow job summary. `test:package` verifies the
packed tarball, including ESM, CommonJS, UMD, and the published TypeScript
declarations. `lint:types` checks package type resolution with
`@arethetypeswrong/cli`. Both package checks require a build first.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/). Release
Please uses them to determine the next version and changelog:

- `fix:` produces a patch release.
- `feat:` produces a minor release.
- A `!` after the type or a `BREAKING CHANGE:` footer marks a breaking change.
- While the package is below 1.0.0, breaking changes bump the minor version.

Keep commits focused. Do not bump `package.json` manually.

## Releasing

Releases are automated through Release Please and GitHub Actions:

1. Merge the Release Please pull request on `master`.
2. The Release workflow checks out the release tag, runs the full test, build,
   package, and type validation suite, and publishes to npm using trusted
   publishing with provenance.
3. Verify the published version and provenance:

   ```sh
   npm view time-chainer@<version> version dist.attestations
   ```

Do not publish manually with `npm publish`.

### Manual release retry

Use this only when a GitHub release and tag exist but the npm publish step
failed. Without a retry, rerunning the normal Release workflow will not publish:
`release_created` is only true on the run that created the release.

1. Open **Actions → Release → Run workflow**.
2. Enter the existing release tag, for example `v0.2.2`.
3. The workflow checks out the tag, verifies that it matches the version in
   `package.json`, runs the full validation suite, and checks npm for an
   existing version before publishing.

The retry is idempotent: if the version is already on npm, it skips the publish
instead of failing. It does not create tags or GitHub releases, and it does not
bump the version. If the tag/release does not exist yet, use the normal Release
Please flow instead.
