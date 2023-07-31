const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const s3Client = require('../client');
const { s3Bucket } = require('../../config');

const getAllFile = async () => {
  const command = new ListObjectsV2Command({
    Bucket: s3Bucket,
    MaxKeys: 10,
  });

  try {
    let isTruncated = true;

    let contents = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3Client().send(command);
      contents = Contents;
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }

    return { message: contents };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getAllFile;
