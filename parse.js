const fs = require('fs');
let readDir = fs.readdirSync('./pages/functions');
let meta = {};

for (var i = 0; i < readDir.length; i++) {
  let file = readDir[i].replace(/((.md|.mdx))+$/, "");
  if(file === "meta.json") {
    console.log("skip meta.json file");
  } else {
      meta[file] = file
  }
}

fs.writeFileSync('./pages/functions/meta.json', JSON.stringify(meta, undefined, 2))
console.log("Success updating meta.json in functions dir")
