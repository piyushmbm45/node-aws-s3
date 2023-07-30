const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();
const { s3Region, s3AccessKey, s3Endpoint, s3SecretKey } = require('../config');

const client = () => {
  if (s3Region && s3AccessKey && s3SecretKey && s3Endpoint) {
    return new S3Client({
      region: s3Region,
      endpoint: 'https://' + s3Endpoint,
      credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: s3SecretKey,
      },
    });
  }
};

module.exports = client;
