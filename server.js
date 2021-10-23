const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connection to localhost company database with employee info. 
const db = mysql.createConnection(
    {
      host: 'localhost',
     
      user: 'root',
     
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  

  

//______________________
// Adds a listener to port
//_______________________
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  })