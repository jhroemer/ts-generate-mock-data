import { intro, outro, text } from "@clack/prompts";
import cac from "cac";

const cli = cac("generate-mock-data");

cli.command("").action(async () => {
  intro(`Generate mock data`);

  const url = (await text({
    message: `Enter URL`,
  })) as Awaited<string>;

  const fetchResponse = await fetch(url);
  const data = await fetchResponse.json();

  if (!fetchResponse.ok) {
    outro(
      `Failed to fetch data from ${url} with status ${fetchResponse.status}`
    );
  }

  console.log(data);
});

cli.help();

cli.parse();
