# $footer

Add a footer in the message.

{% hint style="warning" %}
Footer will only appear if there is a `$button`!
{% endhint %}

### Usage:

```
$footer[text]
```

### Example:

```javascript
bot.command({
    name: "footer",
    code: `Text and button is required!
    $button[id1:Button 1]
    $footer[This is footer]`
});
```

![](../../.gitbook/assets/footer.png)
