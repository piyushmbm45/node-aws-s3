const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../client');
const { s3Bucket } = require('../../config');

const deleteFile = async (folderPath, fileName) => {
  if (!folderPath || !fileName) {
    throw new Error('something went wrong');
  }
  let path = '';
  path = String(folderPath).trim();
  if (String(folderPath).trim().charAt[String(folderPath) - 1] !== '/') {
    path += '/';
  }
  const command = new DeleteObjectCommand({
    Bucket: s3Bucket,
    Key: path + fileName,
  });

  try {
    const response = await s3Client().send(command);
    return { message: response.$metadata };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = deleteFile;
