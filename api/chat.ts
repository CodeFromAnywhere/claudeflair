import { profiles } from "./profiles";

export const OPTIONS = async (request: Request) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  // Handle OPTIONS request (preflight)
  return new Response(null, { headers });
};
export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

export const POST = async (request: Request) => {
  console.log("HEY POST SIMPLE");
  const url = new URL(request.url);
  const profile = url.searchParams.get("profile");
  const { message } = await request.json();

  if (!message) {
    return new Response("Provide a message", { status: 422 });
  }

  const { model, systemPrompt, openapiUrl, basePath, openapiSecret, id } =
    profiles.filter((x) => x.id === profile)[0] || profiles[0];

  console.log({ model, id });
  const openapiPart = openapiUrl?.length
    ? "/" + encodeURIComponent(openapiUrl)
    : "";
  const chatCompletionUrl = `https://chat.actionschema.com${openapiPart}/chat/completions`;

  const body = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    model,
    stream: true,
    stream_options: { include_usage: true },
  };
  const headers = {
    "Content-Type": "application/json",
    "X-BASEPATH": basePath,
    "X-OPENAPI-SECRET": openapiSecret,
    Authorization: `Bearer ${process.env.ANTHROPIC_TOKEN}`,
  };
  console.dir({ chatCompletionUrl, headers, body }, { depth: 10 });
  // Forward the request to the chat completion endpoint
  const response = await fetch(chatCompletionUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(
      "NOT OK",
      response.status,
      response.statusText,
      await response.text(),
    );
    const errorMessage =
      "Error fetching chat: " + response.status + " " + (await response.text());
    return new Response(errorMessage, {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const reader = response.body?.getReader();

  if (!reader) {
    return new Response("No reader", { status: 500 });
  }

  const encoder = new TextEncoder();

  console.log("START STREAM");
  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        controller.enqueue(value);

        // buffer += new TextDecoder().decode(value, { stream: true });
        // const lines = buffer.split("\n");
        // buffer = lines.pop() || "";

        // for (const line of lines) {
        //   if (line.trim() === "") continue;

        //   try {
        //     // if it can parse and doesn't crash, let's send it in
        //     JSON.parse(line.replace(/^data: /, ""));

        //     const encodable = "\n\n" + line;
        //     console.log("encodable:", encodable);
        //     controller.enqueue(new TextEncoder().encode(encodable));

        //     // console.log("something", parsedChunk);
        //     // const content = parsedChunk.choices[0]?.delta?.content;
        //     // if (content !== undefined && content !== null) {
        //     //   controller.enqueue(encoder.encode(content));
        //     // }
        //   } catch (error) {
        //     console.error("Error parsing chunk:", error);
        //     controller.error(error);
        //   }
        // }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Transfer-Encoding": "chunked",
    },
  });
};
