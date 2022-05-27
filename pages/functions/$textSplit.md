# $textSplit

To separate a text with the letters that have been given. And later can be obtained with `$splitText`.

### Usage

```plain
$textSplit[text;separator]
```

### Example

```javascript
bot.command({
  name: "split",
  code: `
$splitText[2] // hi
$splitText[1] // hello
$textSplit[hello|hi;|]`
})
```
