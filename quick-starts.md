# Quick Starts

# Install The Library
The best way to interact with **whatcode.js** is to use one of our official libraries:

{% tabs %} {% tab title="Bash" %}
```bash
# install with npm
npm install whatscode.js
```
{% endtab %} {% endtabs %}

# Setup

{% tabs %} {% tab title="Node.js" %}
```js
const { Client } = require('whatscode.js')
const bot = new Client({
  name: "your bot name",
  prefix: "your bot prefix",
})

// required callbacks
bot.onConnectionUpdate() // connection update
bot.onCredsUpdate() // credentials update
bot.onMessage() // message update

// ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`,
})
```
{% endtab %} {% endtabs %}
