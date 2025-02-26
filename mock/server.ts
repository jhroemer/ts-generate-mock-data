import { createServer } from "@mswjs/http-middleware";
import { http, HttpResponse } from "msw";

const httpServer = createServer(
  http.get("/hello-world", () => {
    return HttpResponse.json([
      {
        hello: "world",
      },
    ]);
  })
);

const port = 9090;
console.log(`Starting server on port: ${port}`);
httpServer.listen(port);
