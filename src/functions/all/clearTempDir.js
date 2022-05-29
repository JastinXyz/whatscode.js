module.exports = async (d) => {
  const fs = require("fs");
  rmDir = function (dirPath) {
    try {
      var files = fs.readdirSync(dirPath);
    } catch (e) {
      return;
    }
    if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + "/" + files[i];
        if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
        else rmDir(filePath);
      }
    fs.rmdirSync(dirPath);
  };

  await rmDir("./tmp");
  await fs.mkdirSync("./tmp");

  return "";
};
