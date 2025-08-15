const path = require('path');
const fs = require('fs');
const zlib = require('zlib');


class CatFileCommand{
    constructor(flag,commitSHA){
        this.flag = flag;
        this.commitSHA = commitSHA;
    }

    execute(){
        const flag = this.flag;
        const commitSHA = this.commitSHA;

        switch(flag){
            case "-p":
                {
                    const folder = commitSHA.slice(0, 2);
                    const completePath = path.join(process.cwd(), ".git", "objects", folder, commitSHA);
                }
            if(!fs.existsSync(completePath)){
                console.error("File does not exist");
                const fileContents = fs.readFileSync(completePath);
                const outputBuffer = zlib.inflateSync(fileContents);

                const output = outputBufffer.toString().split("\x00")[1];

                process.stdout.write(output);
            }
            break;
        }
    }
}

module.exports = CatFileCommand;