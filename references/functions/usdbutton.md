# $button

Add a button to the message.

### Usage:

```
$button[buttonId:buttonText;buttonId:buttonText;...]
```

### Example:

```javascript
bot.command({
    name: "button",
    code: `Text is required!
    $button[id1:Button 1;id2:Another Button]`
});
```

![](<../../.gitbook/assets/button (1).png>)
