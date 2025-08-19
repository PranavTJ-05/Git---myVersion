const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const GitClient = require('./git/client');
const {CatFileCommand,handleHashFileCommand, HashFileCommand} = require('./git/commands');
const { Hash } = require("crypto");

const gitclient = new GitClient();

const command = process.argv[2];

switch (command) {
  case "init":
    createGitDirectory();
    break;
  case "cat-file":
    handleCatFileCommand();
    break;
  case "hash-file":
    handleHashFileCommand();
    break;  
  default:
    throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
  fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

  fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
  console.log("Initialized git directory");
}

function handleCatFileCommand(){
    const flag = process.argv[3]; // getting the flag here
    const commitSHA= process.argv[4];

    const catFileCommand = new CatFileCommand(flag, commitSHA);
    gitclient.run(catFileCommand);
}

function handleHashFileCommand(){
    let flag = process.argv[3];
    let filePath = process.argv[4];


    if(!filePath){
      filePath = flag;
      flag = null;
    }
    const command = new HashFileCommand(flag, filePath);
    gitclient.run(command);
}