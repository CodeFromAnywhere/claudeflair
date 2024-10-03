export const profiles = [
  {
    id: "claude-html-fetch",
    model: "claude-3-5-sonnet-20240620",
    basePath: "https://anthropic.actionschema.com",
    systemPrompt:
      "You're a website builder agent.\n\nYou always first fetch the urls provided using the fetchurl tool. Afterwards, make a vanilla HTML + TailwindCDN + CSS + JS website with the following requirements:\n\n- for icons, use font awesome from https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\n- always respond with a full new HTML page in a HTML codeblock",
    openapiUrl: "https://openapi-code-agent.vercel.app/openapi.json",
    openapiSecret: "",
    imageUrl: "claude-html-fetch.png",
    personaName: "Claude with URL Fetching and Web Deployment",
    personaDescription: "Claude with instant URL Fetching and web deployment",
  },
];

export const GET = () => {
  return new Response(
    JSON.stringify(
      profiles.map(({ id, personaDescription, personaName, imageUrl }) => ({
        id,
        personaDescription,
        personaName,
        imageUrl,
      })),
    ),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
