//REQUIRED
const rename = require('rename');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');

// INFO
let branch = getRepoInfo();
branch = branch.branch;
let name;

//OUTPUT
fs.readdir('./dist/deploy/images', (err, files) => {
	files.forEach(file => {
        name = branch + '_' + file;
        fs.rename('./dist/deploy/images/' + file, './dist/deploy/images/' + name, function (err) {
            if (err) throw err;
          });

    });
})

console.log("-- STAGE COMPLETE: image rename --");
