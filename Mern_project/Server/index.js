// Necessary Imports
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const uploadMiddleware = multer({ dest: "uploads/" });

// JWT Secret
const secret =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Bcrypt Salt
const salt = bcrypt.genSaltSync(10);

const app = express();

// Link to Database
const dbURL =
  "mongodb+srv://AnkurRit16:VgQxkbIDsOzcNL86>@cluster0.qs4dt6t.mongodb.net/?retryWrites=true&w=majority";

// Connect to Database
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) =>
    app.listen(3000, () => {
      console.log("Server running on port 3000...");
    })
  )
  .catch((err) => console.log(err));

// MiddleWares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "JWT must be Provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "JWT Expired!" });
    }
    req.user = decoded;
    next();
  });
};


app.post("/Admin", async (req, res) => {
  const { name, username, password } = req.body;
  const user = await User.create({
    name,
    username,
    password: bcrypt.hashSync(password, salt),
  });
  res.json(user);
});
app.post("/Userlogin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk) {
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: user._id,
        email,
      });
    });
  } else {
    res.status(400).json({ message: "Incorrrect Credentials!" });
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "Logged Out!" });
});
