// REQUIRED
var s3 = require('s3');
const repoName = require('git-repo-name');

// INFO
let name = repoName.sync();

// OUTPUT
var client = s3.createClient({
    maxAsyncS3: 20, // this is the default
    s3RetryCount: 3, // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: "<%= s3accesskey %>",
        secretAccessKey: "<%= s3secretAccessKey %>",
        region: "<%= s3region %>",

        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
});
var params = {
    localDir: "dist/deploy/images",
    s3Params: {
        Bucket: "cornwell-edms",
        Prefix: "_deployments/" +  name,
        ACL: "public-read",

        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
};
var uploader = client.uploadDir(params);

uploader.on('error', function (err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('end', function () {
    console.log("-- STAGE COMPLETE: s3 upload --");
});