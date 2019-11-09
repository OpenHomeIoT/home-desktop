const { series } = require("gulp");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const DIR_BIN = path.join(__dirname, "bin/")

const deleteFolderRecursive = (path) => {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
        var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
    }
};

const build = (cb) => {
  exec("npm run build", (err, stdout, stderr) => {
    console.log(stdout);
    if (err) {
      console.error(stderr);
      cb(err);
    } else {
      cb();
    }
  });
}

const clean = (cb) => {
  deleteFolderRecursive(DIR_BIN);
  cb();
}

exports.build = build;
exports.clean = clean;
exports.default = series(clean, build)