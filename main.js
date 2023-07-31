const express = require('express');
const fileRoutes = require('./filecrud/api');
const app = express();
const { port } = require('./config');
const bucketRoutes = require('./bucketCrud/api');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/file', fileRoutes);

app.use('/bucket', bucketRoutes);

app.listen(port, () => {
  console.log(`listening on port:- ${process.env.PORT}`);
});
