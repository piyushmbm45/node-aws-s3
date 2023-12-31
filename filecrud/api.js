const express = require('express');
const fileRoutes = express();
const s3Client = require('../aws/client');
const { s3Path, s3Bucket } = require('../config');
const { formidable } = require('formidable');
const uploadFile = require('../aws/object/upload');
const fs = require('fs');
const getAllFile = require('../aws/object/getall');
const deleteFile = require('../aws/object/delete');
const { getFile } = require('../aws/object/get');

// Post
// /file/single
// upload single/multiple files
fileRoutes.post('/single', async (req, res) => {
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

// Get
// /file/single
// get single file
fileRoutes.get('/single', async (req, res) => {
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

// Get
// /file/all
// get all files from bucket
fileRoutes.get('/all', async (req, res) => {
  if (!s3Client) {
    return res.status(400).json({ error: 's3 client not available' });
  }
  if (!s3Bucket) {
    return res.status(400).json({ error: 'bucket name is not available' });
  }
  try {
    const resp = await getAllFile();
    res.send(resp.message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
// /file/single
// delete the file from bucket
fileRoutes.delete('/single', async (req, res) => {
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

    const resp = await deleteFile(path, fields['file_name'][0]);
    res.send(resp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = fileRoutes;
