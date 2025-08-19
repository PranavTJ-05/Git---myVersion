const path = require("path");
const fs = require("fs");
const zlib = require("zlib");

class CatFileCommand {
  constructor(flag, commitSHA) {
    this.flag = flag;
    this.commitSHA = commitSHA;
  }

  execute() {
    const flag = this.flag;
    const commitSHA = this.commitSHA;

    switch (flag) {
      case "-p": {
        const folder = commitSHA.slice(0, 2); // first 2 chars
        const fileName = commitSHA.slice(2);  // remaining 38 chars
        const completePath = path.join(
          process.cwd(),
          ".git",
          "objects",
          folder,
          fileName
        );

        if (!fs.existsSync(completePath)) {
          console.error("File does not exist");
          process.exit(1);
        }

        const fileContents = fs.readFileSync(completePath);
        const outputBuffer = zlib.inflateSync(fileContents);

        // Git objects start with "<type> <size>\0<data>"
        const output = outputBuffer.toString().split("\x00")[1];
        process.stdout.write(output);
        break;
      }
    }
  }
}

module.exports = CatFileCommand;
