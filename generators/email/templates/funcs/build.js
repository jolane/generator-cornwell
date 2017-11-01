// REQUIRED
const fs = require('fs');
const args = process.argv.slice(2);
const repoName = require('git-repo-name');
const getRepoInfo = require('git-repo-info');

// INFO
let branch = getRepoInfo();
branch = branch.branch;
let name = repoName.sync();

// OUTPUT
fs.readFile("dist/deploy/index.html", "utf-8", function(err, data) {
    var result = data.replace(/src="images\//g, `src="https://cornwell-edms.s3-ap-southeast-2.amazonaws.com/_deployments/${name}/${branch}_`);

    if (args[0] === 'vision6') {
        result = result.replace(/cursor:auto;/g, '');
    }

    writeFile(result);
});

function writeFile(string) {
    fs.writeFile("dist/deploy/index.html", string, ['utf8', '0o666', 'w+'], function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("----- COMPLETE: email built -----");
    });
}