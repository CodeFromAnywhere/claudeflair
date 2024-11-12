// Este arquivo contém a lógica principal para o endpoint de chat
import { profiles } from "./profiles";
// Configura os cabeçalhos CORS para permitir requisições cross-origin

export const OPTIONS = async (request: Request) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  // Handle OPTIONS request (preflight)
// Configuração do tempo de execução e região do servidor
  return new Response(null, { headers });
};
export const config = {
  //runtime: "edge",
// Manipula requisições POST para o endpoint de chat
// Processa a mensagem do usuário e retorna a resposta do Claude
  regions: ["iad1"],
};

export const POST = async (request: Request) => {
  console.log("HEY POST SIMPLE");
  const url = new URL(request.url);
  const profile = url.searchParams.get("profile");
  const apiKey = request.headers.get("Authorization")?.slice("Bearer ".length);

  const { message, password } = await request.json();
// Obtém as configurações do perfil selecionado ou usa o perfil padrão

  if (!message) {
    return new Response("Provide a message", { status: 422 });
  }

  const { model, systemPrompt, openapiUrl, basePath, openapiSecret, id } =
    profiles.filter((x) => x.id === profile)[0] || profiles[0];

// Prepara o corpo da requisição com as mensagens do sistema e do usuário
  console.log({ model, id });
  const openapiPart = openapiUrl?.length
    ? "/" + encodeURIComponent(openapiUrl)
    : "";
  const chatCompletionUrl = `https://chat.actionschema.com${openapiPart}/chat/completions`;

  const body = {
    messages: [
// Configura os cabeçalhos da requisição incluindo autenticação
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    model,
    stream: true,
    stream_options: { include_usage: true },
  };
  const headers = {
    "Content-Type": "application/json",
// Cria um stream de resposta para enviar dados em tempo real
    "X-BASEPATH": basePath,
    "X-OPENAPI-SECRET": openapiSecret,
// Verifica se o usuário tem a senha correta, caso contrário adiciona um atraso
    Authorization: `Bearer ${apiKey || process.env.ANTHROPIC_TOKEN}`,
  };

  console.dir({ chatCompletionUrl, headers, body }, { depth: 10 });
  // Forward the request to the chat completion endpoint

  console.log("START STREAM");
  const stream = new ReadableStream({
    async start(controller) {
      if (password !== process.env.PASSWORD) {
        const prefix =
          "Because you didn't pay for the password yet, I will start after this sentence. To make this faster, donate and get a password... \n\n\n";

        for (let word of prefix.split(" ")) {
          controller.enqueue(
            new TextEncoder().encode(
              "\n\ndata: " +
                JSON.stringify({
                  id: String(Date.now()),
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: "claude-3-5-sonnet-20240620",
                  system_fingerprint: "",
                  choices: [
                    {
                      index: 0,
                      logprobs: null,
                      delta: { role: "assistant", content: " " + word },
                      finish_reason: null,
                    },
                  ],
// Faz a requisição para o serviço do Claude
                }),
            ),
          );

          await new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 500),
          );
        }
      }

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
// Configura o leitor do stream de resposta
        const errorMessage =
          "Error fetching chat: " +
          response.status +
          " " +
          (await response.text());
// Loop principal para ler e processar a resposta em chunks
        return new Response(errorMessage, {
          status: response.status,
          statusText: response.statusText,
        });
      }

      const reader = response.body?.getReader();

      if (!reader) {
        return new Response("No reader", { status: 500 });
      }

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        // simpler
        controller.enqueue(value);
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
