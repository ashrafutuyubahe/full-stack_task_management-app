const express = require('express');
const bodyParser = require('body-parser');
const allroutes = require('./routers/allroutes');
const dbconnection= require('./dbconnection');
const cors= require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({ origin: 'http://localhost:3001' }));
app.use('/app',allroutes);
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
