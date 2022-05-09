# Command Handler

You can use the command handler if you want the main file to be clean of bot commands.

{% tabs %}
{% tab title="Main File" %}
```javascript
const fs = require("fs");
const path = "./pathToDir/";

var reader = fs.readdirSync(path).filter((file) => file.endsWith(".js"));
for (const file of reader) {
  const command = require(path + file);
  bot.command({
    name: command.name,
    code: command.code,
  });
}

```
{% endtab %}

{% tab title="Command File" %}
```javascript
module.exports = {
  name: "commandName",
  code: `command code`
}
```
{% endtab %}
{% endtabs %}
