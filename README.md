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

# Changelog:

- 2024-10-03: https://x.com/WKarsens/status/1841753924593668447

# Todo:

- I'll go bankrupt if I keep it free 🤑 Let's find something creative to make people pay

  - Require API key after 5 messages per IP per day
  - Allow sending a password to `/message` and if not sent, add prefix "I WILL START IN 5 SECONDS BECAUSE YOU DIDN'T PAY YET" that takes 5 seconds.
  - Also allow entering password in the chat page
  - Stripe link to get password at thankyou page (Cost: €20 one time)

- **long generations** For long website generations, it doesn't complete the full HTML File. It would be great if this could be somehow automatically detected and solved
