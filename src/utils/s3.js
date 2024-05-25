const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { promisify } = require('util');

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKETNAME;
const accessKeyId = process.env.AWS_ACCESSKEYID;
const secretAccessKey = process.env.AWS_SECRETACCESSKEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
});

const generateSignedUrl = async ({ _key, contentType }) => {
    console.log(contentType);
    const bytes = await randomBytes(16);
    const imageName = bytes.toString('hex');
    const ext = contentType.split('/')[1];
    const params = {
        Bucket: bucketName,
        Key: `${imageName}.${ext}`,
        ContentType:contentType,
        Expires: 60
    };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return signedUrl;
};

module.exports = generateSignedUrl;