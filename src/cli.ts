import * as path from "node:path";
import { intro, outro, text } from "@clack/prompts";
import cac from "cac";
import writePrettyFile from "write-pretty-file";
import { nanoid } from "nanoid";
import filenamify from "filenamify";
import createVariableName from "./createVariableName";

const cli = cac("generate-mock-data");

cli
  .command("")
  .option("--output-dir <dir>", "The directory to save mock data files", {
    default: ".",
  })
  .action(async ({ outputDir }) => {
    intro(`Generate mock data`);

    const method = "GET";

    const url = (await text({
      message: `Enter URL`,
    })) as Awaited<string>;

    const response = await fetch(url);
    const parsedResponse = await response.json();

    if (!response.ok) {
      outro(`Failed to fetch data from ${url} with status ${response.status}`);
    }

    const randomValue = nanoid(7);
    const fileName = `${filenamify(`${method}_${url}`, {
      maxLength: 75,
      replacement: "_",
    })}_${randomValue}`;
    const variableName = createVariableName(fileName);

    const filePath = path.join(outputDir, `${fileName}.ts`);

    const fileContent = `const ${variableName} = {
      method: '${method}',
      url: '${url}',
      statusCode: ${response.status},
      response: ${JSON.stringify(parsedResponse)},
    };

    export default ${variableName};
  `;

    await writePrettyFile(filePath, fileContent);

    outro(`File created successfully at ${filePath}`);
  });

cli.help();

cli.parse();
