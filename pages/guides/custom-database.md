# Custom Database

Don't want to use the built-in database of whatscode.js i.e. whatscode.db? now you can use the custom database available. The use of the function is the same, only differs in where the database is stored.

You can just make your own package for this whatscode.js custom database. But it requires some adequate functions. Have a look at [create your own custom whatscode database](#create-your-own)

Here are some custom databases that are compatible with whatscode.js. If you have a custom database for whatscode and want to add it here, you can request it on [Discord](https://discord.gg/CzqHbx7rdU).

- [`whatscode.mongo`](https://npmjs.com/whatscode.mongo) - MongoDB supports for whatscode.js

The ones in this list should have provided how to setup their respective custom databases in whatscode.js.

### Create Your Own

It's easy, your package requires that there are several functions, namely:
- get - to get the value of the name.
- set - to add value and name to database.
- has - checks whether the name of the input is in the database or not. Returns Boolean.
- all - get all database contents (name and value)
- delete - deletes the name and value from the database with the name as input.

Just take an example from [https://github.com/JastinXyz/whatscode.mongo/blob/main/index.js](). It's a wrapper from mongoose.

After creating it you can define into `customDatabase` option. Make sure that the definition can immediately be used for all existing functions.
