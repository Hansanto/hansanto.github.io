## Overview

| Element                                                                                              | Usage                                           |
|------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| [![](https://img.shields.io/badge/TypeScript-darkblue?logo=typescript)](#node)                       | Development language                            |
| [![](https://img.shields.io/badge/Svelte-orange?logo=svelte)](https://svelte.dev/)                   | Frontend framework                              |
| [![](https://img.shields.io/badge/Vite-yellow?logo=vite)](https://vite.dev/)       | Build tool                                     |

## Getting started

We're recommending you to use [NVM](https://github.com/nvm-sh/nvm) to manage your tool versions.

### Node

![](https://img.shields.io/badge/require-black)

Refer you to the [.nvmrc](.nvmrc) file to know the Node version used.

Use the following command to adapt your node version via nvm:

```shell
nvm use
```

## Commands

### Build

To build the project:

```shell
npm run build
```

### Test

To run unit tests:

```shell
npm run test
```

To run integration tests:

> [!NOTE]  
> You need to build the project before running the integration tests.

```shell
# Without UI
npm run test:playwright
# With UI
npm run test:playwright:ui
```

### Local development

To run the project in development mode with hot reload:

```shell
npm run server:dev
```

### Coding style

#### Linter

We are using [ESLint](https://eslint.org/) to validate the coding style.

Check lint issues with the command:

```shell
npm run lint:check
```

Fix lint issues with the command:

```shell
npm run lint:fix
```

#### Formatter

We are using [Prettier](https://prettier.io/) to format the code.

Check the formatting errors with the command:

```shell
npm run format:check
```

Fix formatting errors with the command:

```shell
npm run format:fix
```

## Publishing

> [!NOTE]  
> The set of actions can be retrieved in the [release workflow](./.github/workflows/release.yml).

To publish an update on the GitHub Pages, you just need to push a commit on the `main` branch with a message following the [conventional commits](https://www.conventionalcommits.org/) convention.

Then, a Pull Request will be automatically created to build a new release.

Merge the Pull Request to trigger the release process, and the new version will be automatically published on GitHub Pages.

## Conventions

This project is following [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
