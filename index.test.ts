import { execa } from "execa";
import { test } from "vitest";

test("Generate data", async () => {
  const subprocess = execa`npm run start`;

  for await (const line of subprocess) {
    if (line.includes("Enter URL")) {
      subprocess.stdin?.write("http://localhost:9090/hello-world\r");
      subprocess.stdin?.end();
    }
  }
});
