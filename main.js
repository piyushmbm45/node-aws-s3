const express = require('express');
const fileRoutes = require('./filecrud/api');
const app = express();
const { port } = require('./config');
const bucketRoutes = require('./bucketCrud/api');

// basic middleware for parsing incoming json/urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// apis for file(object) crud operation
app.use('/file', fileRoutes);

// apis for bucket crud operation
app.use('/bucket', bucketRoutes);

// listen the server
app.listen(port, () => {
  console.log(`listening on port:- ${process.env.PORT}`);
});
