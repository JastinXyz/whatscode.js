# $let

Declare a variable and later get it with `$get`.

### Usage:

```plain
$let[name;value]
```

### Example:

```javascript
bot.command({
  name: "letget",
  code: `
$get[hello] // return hi
$let[hello;hi]`
})
```
