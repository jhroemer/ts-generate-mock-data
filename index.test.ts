import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import { execa } from "execa";
import { expect, test } from "vitest";

const directory = process.cwd();
const outputDir = "./output";

const getMockDataFileContent = async () => {
  const fileDirectory = await readdir(path.join(directory, outputDir));
  const unprocessedFile = await readFile(
    path.join(directory, outputDir, fileDirectory[0])
  );
  const mockDataFile = unprocessedFile.toString();

  return mockDataFile;
};

test("Generate data", async () => {
  const subprocess = execa`node dist/cli.js --output-dir output`;

  for await (const line of subprocess) {
    if (line.includes("Enter URL")) {
      subprocess.stdin?.write("http://localhost:9090/hello-world\r");
      subprocess.stdin?.end();
    }
  }

  const mockDataFileContent = await getMockDataFileContent();
  expect(mockDataFileContent).toMatchSnapshot();
});
