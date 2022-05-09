const fs = require("fs");
const parse = fs.readdirSync(__dirname + "/all");
let func = parse.map((z) => "$" + z.replace(/.js/g, ""));

module.exports = func;
