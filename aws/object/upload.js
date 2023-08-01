const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../client');
const { s3Bucket } = require('../../config');
const { getPath } = require('./get');

const uploadFile = async (folderPath, fileName, file) => {
  if (!folderPath || !fileName || !file) {
    throw new Error('something went wrong');
  }
  let path = getPath(folderPath);

  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: path + fileName,
    Body: file,
  });

  try {
    const response = await s3Client().send(command);
    return { message: response.$metadata };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = uploadFile;
