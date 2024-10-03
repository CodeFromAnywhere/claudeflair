# Claude Flair - Claude with instant URL Fetching and web deployment

[Claude of Anthropic](https://anthropic.com) is currently one of the best LLM's out there. Some weeks ago [Alex Albert](https://x.com/alexalbert__) requested feedback about Claude and something that stood out to me was to add "url fetching" to Claude (something [Bruna Baudel](https://x.com/brunabaudel) suggested). At that time I already made [ActionSchema Chat](https://chat.actionschema.com) and I quickly added URL Fetching as a tool to Claude. It worked fantastic! But I forgot to share it with the world.

Claude Flair is a website and hashtag #claudeflair dedicated to sharing the best tool-use use-cases and I'll start by sharing my most useful tool-enabled agent I've made so far:

> Claude with instant URL Fetching and Web Deployment

This agent has a simple system prompt:

```

You're a website builder agent.

You always first fetch the urls provided using the fetchurl tool. Afterwards, make a vanilla HTML + TailwindCDN + CSS + JS website with the following requirements:

- for icons, use font awesome from https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
- always respond with a full new HTML page in a HTML codeblock

```

And most importantly it can use 2 tools:

- To fetch URLs: https://openapi-code-agent.vercel.app/openapi.json
- To deploy generated HTML instantly: https://content.actionschema.com/openapi.json

This project is made possible by:

- https://chat.actionschema.com
- https://anthropic.actionschema.com

# TODO / Changelog:

#buildinpublic thread: https://x.com/WKarsens/status/1841753924593668447

1. It has a bug where it sometimes stops generating in the middle (likely due to nature of my streaming implementation or maybe due to output token length). Solution: add error handling and ensure to put as much as possible as system message, also after tools come back.

- look at stop tokens and ensure they are returned in api and see if that is the cause

1. I'll go bankrupt if I keep it free 🤑 solution: after 10 messages on your IP, link to stripe to submit payment details for automatic monthly payment of 1.25x of claude inference cost. If users don't want to pay, allow them to provide their own API key to bypass the ratelimit and only pay Claude directly.
