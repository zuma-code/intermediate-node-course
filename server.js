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
const DB = "mongodb+srv://Luke:5zZq6a@cluster0.jdtmc.mongodb.net/IntermediateCourse?retryWrites=true&w=majority";
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
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, data) => {
    sendResponse(res, err, data)
  })
})

function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err
    })
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data)
    })
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, (err, data) => {
      sendResponse(res, err, data)
    })
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data)
    })
  })
