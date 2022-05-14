# $button

Add a button to the message.

### Usage:

```
$button[buttonId:buttonText;buttonId:buttonText;...]
```

{% hint style="info" %}
You can enter a command in the button id section so that when clicked, the button will run the command earlier.

```javascript
bot.command({
    name: "pingbutton",
    code: `Click the button!
    $button[!ping:Ping]`
});
```
{% endhint %}

### Example:

```javascript
bot.command({
    name: "button",
    code: `Text is required!
    $button[id1:Button 1;id2:Another Button]`
});
```

![](<../../.gitbook/assets/button (1).png>)
