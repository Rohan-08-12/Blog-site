require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const session = require("express-session");
const postRoutes = require("./routes/postRoutes");
const authRoutes=require("./routes/authRoutes");
const commentRoutes=require("./routes/commentRoutes");
const passportConfig = require("./config/passport");
const errorHandler = require("./middleware/errorHandler");
const userRoutes=require("./routes/userRoutes");

// port
const PORT= process.env.PORT || 3000;

// middlewares
// Pass the value to form and we can access it using req.body
app.use(express.urlencoded({extended: true}));


// session middleware
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    })
}));

// method override
app.use(methodOverride("_method"));


// passport 
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
    res.render("home.ejs",{
        user: req.user,
        error:"",
        title:"Home"
    });
});

// routes
app.use("/auth", authRoutes);
app.use("/posts",postRoutes);
app.use("/",commentRoutes);
app.use("/user",userRoutes);


// error handler
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL)
.then(async()=>{
    console.log("Database connected");

    // await Post.updateMany({}, { $unset: { comment: "" } });
    // console.log("Removed extra 'comment' field");

    // start server
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(()=>{
    console.log("Connection failed");
})


