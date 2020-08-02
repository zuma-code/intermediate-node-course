const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User')

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CONNECT TO DATABASE
// Had trouble connecting to the Db because of spaces in my connection string
const DB = "mongodb+srv://Luke:5zZq6aBNpgvFcuC6@cluster0.jdtmc.mongodb.net/IntermediateCourse?retryWrites=true&w=majority";
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection successful')
}).catch((err) => {
  console.log('Failed to connect')
})


// CREATE
app.post('/users', (req, res) => {
  // User.create()
})

app.route('/users/:id')
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  })