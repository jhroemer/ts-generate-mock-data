import { intro, text } from "@clack/prompts";
import cac from "cac";

const cli = cac("generate-mock-data");

cli.command("").action(async () => {
  intro(`Generate mock data`);

  const url = (await text({
    message: `Enter URL`,
  })) as Awaited<string>;

  const fetchResponse = await fetch(url);
  const data = await fetchResponse.json();
  console.log(data);
});

cli.help();

cli.parse();
