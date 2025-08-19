const path = require('path');
const fs = require('fs');
const crypto  = require('crypto');
const zlib = require('zlib');

class HashFileCommand{
    constructor(flag, filePath){
        this.flag = flag;
        this.filePath = filePath;
    }
    execute(){
        const filePath = path.resolve(this.filePath);
        if(!fs.existsSync(filePath)){
            throw new Error(`File ${filePath} does not exist`);
        }
        //reading the file
        const fileContents = fs.readFileSync(filePath);
        const fileLength = fileContents.length;
        //create blob file
        const header = `blob ${fileLength}\0`;
        const blob = Buffer.concat([Buffer.from(header), fileContents]);

        //create hash
        const hash = crypto.createHash('sha1').update(blob).digest("hex");

        //write the file if -w is present
        if(this.flag === '-w'){
            const folder = hash.slice(0, 2);
            const outputFolder = path.join(process.cwd(), '.git', 'objects', folder);

            if(!fs.existsSync(outputFolder)){
                fs.mkdirSync(outputFolder, { recursive: true });
            }
            fs.writeFileSync(outputPath, blob);
        }

    }
}