const express = require('express');
const cors = require('cors');
const { connectMongoose, User } = require("./database.js")
const ejs = require("ejs");
const passport = require("passport");
const expressSession = require("express-session")
const { initializingPassport, isAuthenticated } = require("./Passport.js")









connectMongoose();
initializingPassport(passport);


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(expressSession({
  secret: "secret", resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.set("view engin", "ejs")


app.get('/', (req, res) => {
  res.send("hello world")
})





app.get("/register", async (req, res) => {
  res.json("register");
})

app.get("/login", (req, res) => {
  res.json("login");
})





app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exists")
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
})

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/register" })
)



app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
})



app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/")
})



app.listen(5000, () => {
  console.log(`Server Started at http://localhost:5000`)
})