const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const items = require('./routes/api/items');

const app = express();

// body parsing middleware
app.use(express.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

// use routes
app.use('/api/items', items);

// server static assets if in production
if (process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    // res.sendFile('index.html');
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}.`));