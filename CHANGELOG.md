# Changelog

## [0.2.0](https://github.com/amoshydra/time-chainer/compare/v0.1.2...v0.2.0) (2026-10-25)


### ⚠ BREAKING CHANGES

* the package is now ESM-first and exposes a new exports map. The CJS entry point moves to dist/index.cjs, and deep imports outside the exported paths are no longer supported.

### Features

* modernize build and development stack ([fee0bd2](https://github.com/amoshydra/time-chainer/commit/fee0bd299d08de68e506e8ff11f2b2c541bfff8a))

## [0.1.2](https://github.com/amoshydra/time-chainer/compare/v0.1.1...v0.1.2) (2026-10-25)


### Bug Fixes

* build on modern Node and publish repository metadata ([9331787](https://github.com/amoshydra/time-chainer/commit/933178743bd0ca3816e6d4036333f32b05a703eb))

## [0.1.1](https://github.com/amoshydra/time-chainer/compare/v0.1.0...v0.1.1) (2024-04-07)


### Bug Fixes

* expose named export Time, force cjs creation of default named export ([f145b05](https://github.com/amoshydra/time-chainer/commit/f145b05339f6216be517fe2e19ba8a8e81f9080d))

## [0.1.0](https://github.com/amoshydra/time-chainer/compare/v0.0.3...v0.1.0) (2024-04-07)


### ⚠ BREAKING CHANGES

* module format has been changed. Please ensure your environment or bundler continue to import the module correctly after version change

### Features

* rewrite project with typescript, use jest and rollup for bundling ([2f1ca82](https://github.com/amoshydra/time-chainer/commit/2f1ca825f5cbe5d2bb4d6bb05a2d08731555bd5d))


### Miscellaneous Chores

* release 0.1.0 ([6d0fbe2](https://github.com/amoshydra/time-chainer/commit/6d0fbe215ebfc526bedbbd734b4d896f04ae629b))
