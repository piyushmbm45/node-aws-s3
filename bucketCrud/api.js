const express = require('express');
const bucketRoutes = express();
const getBuckets = require('../aws/bucket/list');

bucketRoutes.get('/list', async (req, res) => {
  try {
    const resp = await getBuckets();
    res.json(resp.message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = bucketRoutes;
