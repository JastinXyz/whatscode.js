# Quick Starts

{% hint style="info" %}
You should know that **whatscode.js** is still in the testing stage and **whatscode.js** is a new project that was created a few days ago... So maybe there are still many bugs happening, Please report bugs or if you want to give suggestions open an issue in our Github Repository!

We are also very open to those of you who want to contribute...
{% endhint %}

## Install the library

First of all, install **whatscode.js** library:

{% tabs %}
{% tab title="Bash" %}
```bash
# Install via npm
npm install whatscode.js
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
