# $onlyIf

Filters the next code with onlyIf, if the condition returns true then it issues an error message in the onlyIf, otherwise it will continue the code.

### Usage:

```
$onlyIf[condition;error message (optional)
```

### Example:

The bot will not proceed to `$ping` because the condition in onlyIf returns `true`. You can change this condition with other things like functions from whatscode or others. **CODE WORKS FROM THE BOTTOM TO THE UP**

```
$ping
$onlyIf[1<2;2 is greater than 1]
```