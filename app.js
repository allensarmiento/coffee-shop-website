const express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),

    User                  = require("./models/user"),
    Shop                  = require("./models/shop"),
    Stores                = require("./models/stores"),
    seedDB                = require("./seeds");

// ROUTES
const indexRoutes   = require("./routes/index"),
    authRoutes    = require("./routes/auth"),
    cartRoutes    = require("./routes/cart"),
    ordersRoutes  = require("./routes/orders");

const url = process.env.DATABASEURL || "mongodb://localhost:27017/Coffee_Shop";
mongoose.connect(url,  {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // Expect ejs files
app.use(express.static(__dirname + "/public")); // Public folder for css styles
app.use(methodOverride("_method"));
app.use(flash());
seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: process.env.SESSION_SECRET || "This is a default sentence",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to be used on all pages
app.use(function(req, res, next) {
  res.locals.currentUser =  req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(ordersRoutes);

// Listen for app
port = process.env.PORT || 8000;
app.listen(port, process.env.IP, function() {
  console.log("Server is listening!!");
});
