# generate-mock-data

Compact CLI for generating- and saving mock data to TypeScript files

## Local dev

### Testing

The project uses Vitest for testing, and Mock Service Worker for intercepting http requests. To run tests start the mock server and run the tests like such:

```console
npm run test:server
npm run test
```

To ensure distinctiveness, a unique identifier is added to both mock file names and variable names. To achieve deterministic test results, the environment variable `RANDOM_VALUE_TEST_REPLACEMENT` must be set to `123`.
