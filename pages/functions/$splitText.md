# $splitText

To get the word that has been split use `$textSplit`.

### Usage

```plain
$splitText[number]
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
