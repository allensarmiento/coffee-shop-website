var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),

    passport              = require("passport"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),

    Shop                  = require("./models/shop"),
    Stores                = require("./models/stores");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/Coffee_Shop";
mongoose.connect(url,  {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // Expect ejs files
app.use(express.static(__dirname + "/public")); // Public folder for css styles

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "This is a default sentence",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to be used on all pages to tell if user is logged in or not.
app.use(function(req, res, next) {
  res.locals.currentUser =  req.user;
  next();
});

// ============
//    ROUTES
// ============
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/shop", function(req, res) {
  Shop.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("shop", {items: items});
    }
  })
});

app.get("/stores", function(req, res) {
  Stores.find({}, function(err, stores) {
    if (err) {
      console.log(err);
    } else {
      res.render("stores", {stores: stores});
    }
  })
});

app.get("/story", function(req, res) {
  res.render("story");
});

app.get("/joinUs", function(req, res) {
  res.render("joinUs");
});

// ==============
// AUTH ROUTES
// ==============

// show sign up form
app.get("/account", function(req, res) {
  res.render("account");
});

// handling users
app.post("/account/signUp", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("account");
    } 
    // logs the user in and stores user information using the local strategy
    // NOTE: If I'm not using a username and using an email, is there an email strategy?
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

// ==============
// LOGIN ROUTES
// ==============

// middleware
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/account"
}), function(req, res) {
});

// log user out
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account");
}

// Listening on localhost
app.listen(8000, function() {
  console.log("Server is listening!!");
});

// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log("Server is listening!!");
// });
