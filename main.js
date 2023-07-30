const express = require('express');
const fileRoutes = require('./filecrud/api');
const app = express();
const { port } = require('./config');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`listening on port:- ${process.env.PORT}`);
});
