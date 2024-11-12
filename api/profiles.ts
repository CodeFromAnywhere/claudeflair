/**
 * Konfigurationsmodul für Chat-Profile
 * Definiert verfügbare Chat-Profile und deren Einstellungen
 */

export const config = {
  // runtime: "edge",
  regions: ["iad1"],
// Liste der verfügbaren Chat-Profile

};
export const profiles = [
  {
    id: "claude-html-fetch",
    model: "claude-3-5-sonnet-20240620",
    basePath: "https://anthropic.actionschema.com",
    systemPrompt: `You're a website builder agent.
      
If needed for context, fetch the url using the fetchurl tool. For github urls, replace github.com with uithub.com.

Afterwards, make a vanilla HTML + TailwindCDN + CSS + JS website with the following requirements:

- for icons, use font awesome from https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
- always respond with a full new HTML page in a HTML codeblock`,
    openapiUrl: "https://openapi-code-agent.vercel.app/openapi.json",
    openapiSecret: "",
    imageUrl: "claude-html-fetch.png",
    personaName: "Claude with URL Fetching and Web Deployment",
    personaDescription: "Claude with instant URL Fetching and web deployment",
// CORS-Optionen Endpunkt

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
/** 
 * API-Endpunkt zum Abrufen der verfügbaren Profile
 * Gibt eine vereinfachte Version der Profile zurück
 */

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
