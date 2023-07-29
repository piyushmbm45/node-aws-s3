const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log('listening on port');
});
