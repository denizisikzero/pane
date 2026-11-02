# Contributing

Thanks for your interest in contributing to Pane. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also recommend checking the open issues and pull requests to see if someone else is already working on something similar.

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [Biome](https://biomejs.dev) for linting and formatting.

## Structure

This repository is structured as follows:

```
apps
└── www
    ├── app
    ├── components
    ├── lib
    └── registry
        └── pane
            ├── blocks
            ├── examples
            ├── hooks
            ├── lib
            └── ui
packages
└── tests
```

| Path                            | Description                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| `apps/www/app`                  | The Next.js application for the website and docs.                  |
| `apps/www/components`           | The React components for the website.                              |
| `apps/www/lib`                  | Site config, component metadata and docs navigation.               |
| `apps/www/registry/pane/ui`     | The registry components — what `shadcn add @pane/...` installs.    |
| `apps/www/registry/pane/examples` | The demos shown on each component page.                          |
| `apps/www/registry/pane/blocks` | Whole screens built from the components, shown on /blocks.          |
| `apps/www/registry/pane/lib`    | The glass engine: refraction filter, springs and shared config.    |
| `apps/www/registry.json`        | The registry manifest.                                             |
| `packages/tests`                | Integration tests that install the registry with the shadcn CLI.   |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/pane.git
```

### Navigate to project directory

```bash
cd pane
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run the website

```bash
pnpm dev
```

This builds the registry first, then starts the docs at http://localhost:3000. The built registry is served from http://localhost:3000/r/[name].json.

## Components

Components live in `apps/www/registry/pane/ui` and are built on the `<Pane>` primitive. Their APIs follow [shadcn/ui](https://ui.shadcn.com), so code written for shadcn/ui works with only the import path changed.

When adding a component, please make sure you:

1. Add the component to `registry/pane/ui` and a demo to `registry/pane/examples`.
2. Add an item to `registry.json`.
3. Add its metadata to `lib/components-meta.ts` and a link to the docs navigation in `lib/site-config.ts`.
4. Run `pnpm registry:validate` and `pnpm lint`.

The glass tokens (`--pane-*`) are defined in `apps/www/app/globals.css`. `pnpm registry:build` copies them into `registry.json`, so edit them in `globals.css` only.

### Don't use `asChild` on Radix primitives

When a project uses a Base UI style (such as `base-nova`), `shadcn add` rewrites registry code on install: a literal `asChild` on a Radix primitive is turned into a `render` prop, which Radix ignores, or dropped altogether. Neither shows up as a type error. Put the classes on the primitive itself instead, or, where `asChild` is unavoidable, pass it through a spread with a comment explaining why.

### Test the install

Before opening a pull request, run:

```bash
pnpm test
```

It builds the registry, installs every component into a fresh Next.js app that uses a Base UI style, and fails if any installed file differs from its source or the app doesn't type-check. CI runs the same tests on every pull request. See [`packages/tests`](packages/tests/README.md) for more.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message, in lowercase, while using one of the following categories:

- `feat`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `chore`: all changes to the repository that do not fit into any of the above categories

e.g. `feat(www): add a playground page` or `fix: keep the switch thumb in place`

## Requests for new components

If you have a request for a new component, please open an issue on GitHub. We'll be happy to help you out.

## Testing

Tests are written using [Vitest](https://vitest.dev) and live in `packages/tests`. Run them from the root of the repository:

```bash
pnpm test
```

Please make sure the tests pass before opening a pull request.
