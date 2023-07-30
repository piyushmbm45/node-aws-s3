const express = require('express');
const fileRoutes = express();
const s3Client = require('../aws/client');
const { s3Path, s3Bucket } = require('../config');
const { formidable } = require('formidable');
const uploadFile = require('../aws/upload');
const fs = require('fs');
const getFile = require('../aws/get');

fileRoutes.post('/upload', async (req, res) => {
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

    path = fields['folder_path'][0] ?? s3Path;

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

fileRoutes.get('/get', async (req, res) => {
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

    let path = '';
    if (!s3Path && !fields['folder_path']) {
      throw new Error('please provide folder path');
    }
    path = fields['folder_path'][0] ?? s3Path;
    if (!fields['file_name']) {
      throw new Error('please provide file name');
    }

    const resp = await getFile(path, fields['file_name'][0]);
    const out = await resp.message;
    res.send(out);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = fileRoutes;
