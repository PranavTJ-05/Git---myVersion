# Git---myVersion

---

Linus took approximately 10 days to create the most useful invention for developers called git lemme see how long does it take me to create a own version of git.

## Project Details

This is a JavaScript implementation of Git, based on the
["Build Your Own Git" Challenge](https://codecrafters.io/challenges/git).

In this project, I'm building a small Git implementation that's capable of
initializing a repository, creating commits and cloning a public repository.
Along the way I'm learning about the `.git` directory, Git objects (blobs,
commits, trees etc.), Git's transfer protocols and more.

## Usage

The entry point for this Git implementation is in `app/main.js`.

### Setup

1. Ensure you have `node (21)` installed locally
2. Run `./your_program.sh` to run the Git implementation

### Testing locally

The `your_program.sh` script is expected to operate on the `.git` folder inside
the current working directory. To avoid damaging your repository's `.git`
folder, execute it in a different folder:

```sh
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init
```

To make this easier to type out, you could add a shell alias:

```sh
alias mygit=/path/to/your/repo/your_program.sh

mkdir -p /tmp/testing && cd /tmp/testing
mygit init
```
