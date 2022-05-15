# Quick Starts

{% hint style="info" %}
**Please note:** That **whatscode.js** functions code runs from the ground up.

Need help? Join our Discord at: [https://discord.gg/CzqHbx7rdU](https://discord.gg/CzqHbx7rdU)
{% endhint %}

## Install the library

First of all, install **whatscode.js** library:

{% tabs %}
{% tab title="Bash" %}
```bash
# Install via npm
npm install whatscode.js

# or install it from Github for more new features, some bug fixes, and mybe theres some bugs too.
npm i github:JastinXyz/whatscode.js
```
{% endtab %}
{% endtabs %}

## Make your first simple bot

Create your first bot using **whatscode.js** with just a few lines:

{% tabs %}
{% tab title="Node.js" %}
```javascript
const { Client } = require("whatscode.js");

const bot = new Client({
  name: "Your bot name",
  prefix: "Your bot prefix",
});

// required callback
bot.onConnectionUpdate(); // connection update
bot.onCredsUpdate(); // credentials update
bot.onMessage(); // message update

// ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`
});
```
{% endtab %}
{% endtabs %}

## Links

* Documentation: [https://whatscode.jstnlt.my.id](https://whatscode.jstnlt.my.id)
* Discord Server: [https://discord.gg/CzqHbx7rdU](https://discord.gg/CzqHbx7rdU)
