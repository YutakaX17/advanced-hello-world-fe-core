# Advanced Hello World Frontend Core

Reusable React and TypeScript library containing the application shell, shared
layout styles, and typed feature-module contracts. Feature pages and API clients
live in independently versioned packages. This repository does not provide an
HTML entry point or production web server; those belong to the
[frontend assembler](https://github.com/YutakaX17/advanced-hello-world-fe).

## Exported behavior

- `AppShell`
- reusable stylesheet through the `./styles.css` export
- a typed `ApplicationModule` contract for independently installed features

The Hello World page, message API client, form styles, and success feedback are
provided by
[the messages module](https://github.com/YutakaX17/advanced-hello-world-fe-messages).

## Requirements

- Git
- Node.js 22
- npm
- Docker only for the complete assembled application

## Native development without Docker

```bash
git clone https://github.com/YutakaX17/advanced-hello-world-fe-core.git
cd advanced-hello-world-fe-core
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Tests run with Vitest, Testing Library, jsdom, and coverage. The production
library and TypeScript declarations are written to `dist/`.

## Use from a sibling frontend checkout

Clone both frontend repositories into the same parent directory:

```text
workspace/
├── advanced-hello-world-fe-core/
└── advanced-hello-world-fe/
```

The assembler's local dependency points to the sibling directory. Build the
core before installing or building the assembler:

```bash
cd advanced-hello-world-fe-core
npm ci
npm run build
cd ../advanced-hello-world-fe
npm ci
npm run dev
```

## Use as a package

The package name is `@yutakax17/advanced-hello-world-fe-core`. Import its public
API and stylesheet:

```tsx
import {
  AppShell,
  defineModule,
} from "@yutakax17/advanced-hello-world-fe-core";
import "@yutakax17/advanced-hello-world-fe-core/styles.css";
```

React and React DOM are peer dependencies and must be supplied by the consuming
application.

## Docker setup

This library does not run as a standalone container. The frontend assembler
installs it during its build and serves the result with unprivileged Nginx. Use
the [distribution repository](https://github.com/YutakaX17/advanced-hello-world)
to run the complete Docker application.

## Releases and security

Tags follow Semantic Versioning. Releases publish the package archive, SPDX
SBOM, and SHA-256 checksums. Pull requests run Prettier, ESLint, TypeScript,
tests, builds, dependency review, CodeQL, secret scanning, and vulnerability
scanning.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and the
[release page](https://github.com/YutakaX17/advanced-hello-world-fe-core/releases).

## Repository family

- [Backend core](https://github.com/YutakaX17/advanced-hello-world-be-core)
- [Backend assembler](https://github.com/YutakaX17/advanced-hello-world-be)
- [Frontend assembler](https://github.com/YutakaX17/advanced-hello-world-fe)
- [Frontend messages module](https://github.com/YutakaX17/advanced-hello-world-fe-messages)
- [All-in-one distribution](https://github.com/YutakaX17/advanced-hello-world)
