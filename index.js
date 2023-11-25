const express = require('express');
const dotenv = require('dotenv'); 
dotenv.config(); 
const app = express();


var cors = require("cors");
app.use(cors());

require('./config/db');
const routes = require("./routes/routes")


const PORT = process.env.PORT || 3000;
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});