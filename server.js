const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const User = require("./models/user");
const seedDB = require("./seeds");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");

const app = express();

const url = process.env.DATABASEURL || "mongodb://localhost:27017/coffee_shop";
mongoose.connect(url,  {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB(); 

app.use(require("express-session")({
  secret: process.env.SESSION_SECRET || "Your_Session_Secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser =  req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(ordersRoutes);

const port = process.env.PORT || 8000;
app.listen(port, process.env.IP, function() {
  console.log("Server is listening on port", port);
});
