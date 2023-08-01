const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../client');
const { s3Bucket } = require('../../config');

const getFile = async (folderPath, fileName) => {
  if (!folderPath || !fileName) {
    throw new Error('something went wrong');
  }
  // decide path
  let path = getPath(folderPath);

  const command = new GetObjectCommand({
    Bucket: s3Bucket,
    Key: path + fileName,
  });

  try {
    const response = await s3Client().send(command);
    return { message: response.Body.transformToString() };
  } catch (err) {
    throw new Error(err);
  }
};

// get path from folder path or add / if not have
function getPath(folderPath) {
  let path = '';
  path = String(folderPath).trim();
  if (String(folderPath).trim().charAt[String(folderPath) - 1] !== '/') {
    path += '/';
  }
  return path;
}

module.exports = { getFile, getPath };
