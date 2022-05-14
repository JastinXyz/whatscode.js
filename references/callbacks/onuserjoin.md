---
description: This callback will listen to people who join the group.
---

# onUserJoin

{% hint style="info" %}
You can put this callback under other callbacks like `onMessage` and others in your main file.

```javascript
bot.onUserJoin()
```
{% endhint %}

### Command:

This command will run when someone joins the group. The `onUserJoin` callback is also required if you enable `userJoinCommand`.

```javascript
bot.userJoinCommand({
  groupJid: 'group jid', // you can use the get variables here
  code: `code`
})
```

### Code Breakdown:

* `{userJid}` - The user JID.
* `{groupJid}` - The group JID.
* `{user}` - Mentions the user.
* `{group}` - Group name.
* And you can use other **whatscode.js** functions.

### Example:

```javascript
bot.userJoinCommand({
  groupJid: '123@g.us',
  code: `Hello {user}, Welcome to {group}
Your profile pic: $profilePic[{userJid}]`
})
```
