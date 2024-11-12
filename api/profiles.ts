export const config = {
  // runtime: "edge",
  regions: ["iad1"],
};
export const profiles = [
  {
    id: "claude-html-fetch",
    model: "claude-3-5-sonnet-20240620",
    basePath: "https://anthropic.actionschema.com",
    systemPrompt: `Je bent een website bouwer agent.
      
Haal indien nodig voor context de url op met behulp van de fetchurl tool. Voor github urls, vervang github.com door uithub.com.

Maak daarna een vanilla HTML + TailwindCDN + CSS + JS website met de volgende vereisten:

- voor iconen, gebruik font awesome van https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
- reageer altijd met een volledige nieuwe HTML-pagina in een HTML-codeblok`,
    openapiUrl: "https://openapi-code-agent.vercel.app/openapi.json",
    openapiSecret: "",
    imageUrl: "claude-html-fetch.png",
    personaName: "Claude met URL-ophaling en Webimplementatie",
    personaDescription: "Claude met directe URL-ophaling en webimplementatie",
  },
];
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
