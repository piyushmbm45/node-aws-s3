const express = require('express');
const fileRoutes = express();
const s3Client = require('../aws/client');
const { s3Path, s3Bucket } = require('../config');
const { formidable } = require('formidable');
const uploadFile = require('../aws/upload');
const fs = require('fs');

fileRoutes.post('/upload/:name', async (req, res) => {
  if (!s3Client) {
    return res.status(400).json({ error: 's3 client not available' });
  }
  if (!s3Bucket) {
    return res.status(400).json({ error: 'bucket name is not available' });
  }

  try {
    const form = formidable();
    const result = await form.parse(req);
    const fields = result[0];
    const files = result[1];

    let path = '';
    if (!s3Path && !fields['folder_path']) {
      throw new Error('please provide folder path');
    }

    path = s3Path ?? fields['folder_path'][0];

    // synchronously uploading files
    files['files'].forEach(async (file) => {
      const fileBuffer = fs.readFileSync(file.filepath);
      await uploadFile(path, file.originalFilename, fileBuffer);
    });
    res.json({ message: 'all files uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = fileRoutes;
