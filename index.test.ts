import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import { execa } from "execa";
import { expect, test } from "vitest";
import { temporaryDirectory } from "tempy";
import { getBinPath } from "get-bin-path";

const directory = temporaryDirectory();
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
  const binPath = await getBinPath();

  if (!binPath) {
    throw new Error("binPath is not defined");
  }

  const subprocess = execa({
    cwd: directory,
  })`node ${binPath} --output-dir ${outputDir}`;

  for await (const line of subprocess) {
    if (line.includes("Enter URL")) {
      subprocess.stdin?.write("http://localhost:9090/hello-world\r");
      subprocess.stdin?.end();
    }
  }

  const mockDataFileContent = await getMockDataFileContent();
  expect(
    mockDataFileContent,
    "Did you remember to set the RANDOM_VALUE_TEST_REPLACEMENT env varable to '123'?"
  ).toMatchSnapshot();
});
