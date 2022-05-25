# $argsCheck

Checks that the message has the args specified.

### Usage:

```plain
$argsCheck[condition;error message]
```

### Example:

```javascript
bot.command({
    name: "example1",
    code: `You have more than 2 args.
    $argsCheck[>2;Your args is less than 2.]`
});
```
