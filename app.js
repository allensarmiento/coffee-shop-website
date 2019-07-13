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
  
var indexRoutes = require("./routes/index"),
    authRoutes  = require("./routes/auth");

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

app.use(indexRoutes);
app.use(authRoutes);

// Listening on localhost
app.listen(8000, function() {
  console.log("Server is listening!!");
});

// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log("Server is listening!!");
// });
