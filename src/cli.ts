import path from "node:path";
import fs from "node:fs";
import { intro, outro, text } from "@clack/prompts";
import cac from "cac";

const cli = cac("generate-mock-data");

cli.command("").action(async () => {
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

  const fileName = "mockData";
  const variableName = "mockData";

  const filePath = path.join(".", `${fileName}.ts`);

  const fileContent = `const ${variableName} = {
      method: '${method}',
      url: '${url}',
      statusCode: ${response.status},
      response: ${JSON.stringify(parsedResponse)},
    };

    export default ${variableName};
  `;

  fs.writeFileSync(filePath, fileContent);

  outro("File created successfully!");
});

cli.help();

cli.parse();
