const { nextTick } = require("process");
const { text } = require("stream/consumers");

const fs = require("fs").promises;

let root = CD = { dir: "/", dirs: [], files: [], size: 0};  // current directory is root
fs.readFile("./inputs/day07.txt", "utf8").
  then(data => {
    data = data.split("\n")
    // very first line is "$ cd /" always
    for (let i = 1; i < data.length; i++) {
      let line = data[i];
      let cmd = read(line);
      switch (cmd) {
        case "cd":
          const dir = line.slice(5);
          changeDir(dir);
          break;
        case "ls":
          while (i<data.length-1) {
            line = data[++i];
            if (line.startsWith("$")) {
              i--;
              break;
            }
            if (line.startsWith("dir ")) {
              createDir(line.slice(4));
            } else { 
              addFile(line);
            }
            // next
          }
          break;
      }
    };
    
    crawlDirs(root);
    console.log("Answer:", answer);  // 1792222
  });

const read = cmd => {
  if (cmd.startsWith("$ cd ")) {
    return "cd";
  } else if (cmd.startsWith("$ ls")) {
    return "ls";
  }
  return new Set(s).size === 4;
}

const createDir = dir => {
  CD.dirs.push({ dir: dir, dirs: [], files: [], parent: CD, size: 0 })
}

const changeDir = dir => {
  if (dir === "..") {
    CD = CD.parent;
  } else {
    ndir = CD.dirs.find(d => d.dir === dir);
    if (ndir) {
      CD = ndir;
    } else {
      console.error("Directory", dir, "not found");
    }
  };
};

const addFile = line => {
  [ size, filename ] = line.split(" ");
  size = Number(size);
  CD.files.push({file: filename, size: size});
  CD.size += size;
}

const dirSize = dir => {
  let size = dir.size;
  if (dir.dirs.length == 0) return size;
  dir.dirs.forEach(d => {
    size += dirSize(d);
  });
  // console.log(size);
  return size;
}

const k = 100000;
let answer = 0;
const crawlDirs = dir => {
  if (dir.dirs.length == 0) {
    console.log(dir.dir, dir.size);
    if (dir.size<=k) {
      answer += dir.size;
    }
    return;
  };
  let size = 0;
  dir.dirs.forEach(d => {
    size += dirSize(d);
    crawlDirs(d);
  })
  console.log(dir.dir, size, dir.size, size + dir.size);
  size += dir.size;
  if (size <= 100000) {
    answer += size;
  }
}