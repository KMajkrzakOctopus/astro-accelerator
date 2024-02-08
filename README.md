# Astro Accelerator

[![Deploy and Test](https://github.com/Steve-Fenton/astro-accelerator/actions/workflows/build-astro.yml/badge.svg)](https://github.com/Steve-Fenton/astro-accelerator/actions/workflows/build-astro.yml)

Review the documentation at [astro.stevefenton.co.uk](https://astro.stevefenton.co.uk/)

[![npm](https://img.shields.io/npm/v/astro-accelerator?color=blue&style=plastic)](https://www.npmjs.com/package/astro-accelerator/)
[![npm](https://img.shields.io/npm/dm/astro-accelerator?style=plastic)](https://www.npmjs.com/package/astro-accelerator/)

## Image optimization on Linux

Currently, to run the image optimization on Linux, you need to force a compatible version of Sharp to be installed. Any suggestions for a better approach would be appreciated:

```bash
pnpm install --include=optional sharp
pnpm install --force @img/sharp-linux-x64
```

## Publish to NPM

Update the `package.json` with the new version number, and commit the change with the message "Release n.n.n", for example, if the new version is `4.0.9` commit with: "Release 4.0.9".

The NPM token expires periodically and must be updated in GitHub settings -> Secrets -> Actions.

## Upgrades

- [Upgrading from v3 to v4 of Astro and Astro Accelerator.](https://www.stevefenton.co.uk/blog/2023/12/upgrade-astro-v4/)
