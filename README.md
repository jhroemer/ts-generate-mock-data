# ts-generate-mock-data

- 💻 Instantly generate mock data, from actual endpoint responses, through a CLI - just follow the prompts and copy and paste your endpoint.
- ✍️ Data is saved in TypeScript files for seamless auto-import and easier tracking of unused files/variables.
- 🤓 Generates unique, readable file- and variable names.

> [!IMPORTANT]  
> Currently the CLI is for safe http methods, and only `GET` is currently supported.

## API

`ts-generate-mock-data` is both a CLI and a JavaScript library

### CLI

Usage:

```console
  $ ts-generate-mock-data

Options:
  --output-dir <dir>           The directory to save the mock data files (default: .)
  -h, --help                   Display this message
  -v, --version                Display version number
```

Example usage

```console
ts-generate-mock-data --output-dir ./output
```

### Library

```console
npm install --save-dev ts-generate-mock-data
```

## Local dev

### Testing

The project uses Vitest for testing, and Mock Service Worker for intercepting http requests. To run tests start the mock server and run the tests like such:

```console
npm run test:server
npm run test
```

To ensure distinctiveness, a unique identifier is added to both mock file names and variable names. To achieve deterministic test results, the environment variable `RANDOM_VALUE_TEST_REPLACEMENT` must be set to `123`.

### Release

```console
npm run release
```
