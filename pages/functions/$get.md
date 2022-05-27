# $get

To get the value of the varianlb that has been declared by `$let`.

### Usage:

```plain
$get[name]
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
