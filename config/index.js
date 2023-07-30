require('dotenv').config();

const config = {
  port: process.env.PORT,
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3SecretKey: process.env.S3_SECRET_ACCESS_KEY,
  s3Region: process.env.S3_REGION,
  s3Endpoint: process.env.S3_ENDPOINT,
  s3Path: process.env.S3_PATH,
  s3Bucket: process.env.S3_BUCKET_NAME,
};

module.exports = config;
