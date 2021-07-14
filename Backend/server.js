const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');

var app = express();

//environment variables
require('dotenv').config();

//database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;

connection.once('open', () => {
console.log('Connected Database Successfully');
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json("Welcome to application");
});

  // POST localhost:3001/user/<id>
app.post("/user", async (request, response) => {
    const user = new User(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  });

    // GET localhost:3001/users
  app.get("/users", async (request, response) => {
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

    // PATCH localhost:3001/user/<id>
  app.patch("/user/:id", async (request, response) => {
    try {
      await User.findByIdAndUpdate(request.params.id, request.body);
      await User.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  // DELETE localhost:3001/user/<id>
  app.delete("/user/:id", async (request, response) => {
    try {
      const user = await User.findByIdAndDelete(request.params.id);
  
      if (!user) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.listen(3001,function(req,res){
console.log('Server is started on port 3001');
});