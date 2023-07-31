const { ListBucketsCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../client');

const getBuckets = async () => {
  const command = new ListBucketsCommand({});

  try {
    const response = await s3Client().send(command);
    return { message: response };
  } catch (err) {
    console.log('file: list.js:12 ~ getBuckets ~ err:', err);
    throw new Error(err);
  }
};

module.exports = getBuckets;
