const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const app = express();
const port = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connection to localhost company database with employee info. 
const db = mysql.createConnection(
    {
      host: 'localhost',
     
      user: 'root',
     
      password: 'root',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );