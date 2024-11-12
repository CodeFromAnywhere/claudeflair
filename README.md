# Claude Flair - Claude met directe URL-ophaling en webimplementatie

[Claude van Anthropic](https://anthropic.com) is momenteel een van de beste LLM's die er zijn. Enkele weken geleden vroeg [Alex Albert](https://x.com/alexalbert__) om feedback over Claude en iets wat opviel was om "url-ophaling" toe te voegen aan Claude (iets wat [Bruna Baudel](https://x.com/brunabaudel) suggereerde). Op dat moment had ik al [ActionSchema Chat](https://chat.actionschema.com) gemaakt en ik voegde snel URL-ophaling toe als tool voor Claude. Het werkte fantastisch! Maar ik vergat het met de wereld te delen.

Claude Flair is een website en hashtag #claudeflair gewijd aan het delen van de beste tool-gebruik use-cases en ik zal beginnen met het delen van mijn meest nuttige tool-enabled agent die ik tot nu toe heb gemaakt:

> Claude met directe URL-ophaling en Webimplementatie

Deze agent heeft een eenvoudige systeemprompt:

```

Je bent een website bouwer agent.

Je haalt altijd eerst de URL's op met behulp van de fetchurl tool. Daarna maak je een vanilla HTML + TailwindCDN + CSS + JS website met de volgende vereisten:

- voor iconen, gebruik font awesome van https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
- reageer altijd met een volledige nieuwe HTML-pagina in een HTML-codeblok

```

En het belangrijkste is dat het 2 tools kan gebruiken:

- Om URL's op te halen: https://openapi-code-agent.vercel.app/openapi.json
- Om gegenereerde HTML direct te implementeren: https://content.actionschema.com/openapi.json

Dit project is mogelijk gemaakt door:

- https://chat.actionschema.com
- https://anthropic.actionschema.com

# Wijzigingslog:

- 2024-10-03: https://x.com/WKarsens/status/1841753924593668447

# Te doen:

- **lange generaties**: Voor lange website-generaties maakt het het volledige HTML-bestand niet af. Het zou geweldig zijn als dit op de een of andere manier automatisch gedetecteerd en opgelost zou kunnen worden.
- **toon foutmelding**: als er een probleem is, zorg ervoor dat er een foutmelding voor wordt weergegeven
