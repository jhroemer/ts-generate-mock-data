# ts-generate-mock-data

- 💻 Instantly generate mock data, from actual endpoint responses, through a CLI - just follow the prompts and copy and paste your endpoint.
- ✍️ Data is saved in TypeScript files for seamless auto-import and easier tracking of unused files/variables.
- 🤓 Generates unique, readable file- and variable names.

> [!IMPORTANT]  
> Currently the CLI is for safe http methods, and only `GET` is currently supported.

## Summary

WIP

## Local dev

### Testing

The project uses Vitest for testing, and Mock Service Worker for intercepting http requests. To run tests start the mock server and run the tests like such:

```console
npm run test:server
npm run test
```

To ensure distinctiveness, a unique identifier is added to both mock file names and variable names. To achieve deterministic test results, the environment variable `RANDOM_VALUE_TEST_REPLACEMENT` must be set to `123`.
