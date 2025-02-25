import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import { execa } from "execa";
import { expect, test } from "vitest";

const directory = process.cwd();
const outputDir = "./output";

async function getFixtureFileContent() {
  const fixtureDir = await readdir(path.join(directory, outputDir));
  const unprocessedFixtureFile = await readFile(
    path.join(directory, outputDir, fixtureDir[0])
  );
  const fixtureFile = unprocessedFixtureFile.toString();

  return fixtureFile;
}

test("Generate data", async () => {
  const subprocess = execa`node dist/cli.js --output-dir output`;

  for await (const line of subprocess) {
    if (line.includes("Enter URL")) {
      subprocess.stdin?.write("http://localhost:9090/hello-world\r");
      subprocess.stdin?.end();
    }
  }

  const fixtureFileContent = await getFixtureFileContent();
  expect(fixtureFileContent).toMatchSnapshot();
});
