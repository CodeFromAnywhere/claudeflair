# 🎨 Claude Flair

> 🚀 Give Claude superpowers with instant URL fetching and web deployment

## ✨ Features

- 🌐 **Instant URL Fetching**: Claude can analyze any website or GitHub repo in real-time
- 🎯 **Instant Deployment**: Generate and host websites with one click
- 🤖 **Smart HTML Generation**: Creates modern, responsive websites using Tailwind CSS

## 🛠️ Tools Used

Claude Flair combines two powerful tools:

1. 🔍 **URL Fetching**: [openapi-code-agent.vercel.app/openapi.json](https://openapi-code-agent.vercel.app/openapi.json)
2. 🚀 **Web Deployment**: [content.actionschema.com/openapi.json](https://content.actionschema.com/openapi.json)

## 💡 How It Works

The agent uses a simple but effective system prompt:

```
You're a website builder agent.

If needed for context, fetch the url using the fetchurl tool. For github urls, replace github.com with uithub.com.

Afterwards, make a vanilla HTML + TailwindCDN + CSS + JS website with the following requirements:

- for icons, use font awesome from https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
- always respond with a full new HTML page in a HTML codeblock
```

## 🌟 Try It Out

Visit [claudeflair.com](https://claudeflair.com) to experience it yourself!

## 🙏 Credits

This project is powered by:

- 🎯 [chat.actionschema.com](https://chat.actionschema.com)
- 🤖 [anthropic.actionschema.com](https://anthropic.actionschema.com)

## 📝 Changelog

- 🚀 2024-10-03: [Initial Release Tweet](https://x.com/WKarsens/status/1841753924593668447)

## 🔄 Known Issues

1. **Long Generations**: Sometimes the HTML generation gets cut off for complex websites. Working on a fix!
2. **Error Handling**: Need to implement better error messages when things go wrong.

## 🤝 Contributing

Feel free to open issues and PRs! Let's make Claude Flair even better together.

## 📫 Contact

Reach out on Twitter [@WKarsens](https://twitter.com/WKarsens) for questions or feedback!