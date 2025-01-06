const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");


// Render login page
exports.getLogin = asyncHandler((req, res) => {
    // render is used to get ejs file
    res.render("login.ejs",{
        title:'Login',
        user:req.user,
        error:""
    });
    // res.json({msg: "login"});
});

// Login Logic
exports.login=asyncHandler(async(req, res,next) => {
    passport.authenticate(
        "local",(err,user,info)=>{
            if(err){
                return next(err);
              }
            if(!user){
                return res.render("login.ejs", {
                    title:'Login',
                    user:req.user,
                    error: info.message,
                });

            }  
            req.logIn(user, (err)=>{
                if(err){
                    return next(err);
                }
                return res.redirect("/user/profile");
            })
        }
    )(req,res,next)

    // Temp logic
    // const{email,password}=req.body;
    // // console.log(email, password);
    // try{
    //     // find the user 
    //     const user = await User.findOne({email});
    //     const isMatch = await User.findOne({password});

    //     if(isMatch && user){
    //         res.send("login success");
    //     }else{
    //         res.send("login failed");
    //     }
    // }catch(error){
    //     res.send(error);
    // }
})

// Get register page
exports.getRegister =  asyncHandler((req, res) => {
    // render is used to get ejs file
    res.render("register.ejs",{
        title:'Register',
        user:req.user,
        error:""
    });
    // res.json({msg: "login"});
});

// Register Logic
exports.register=asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.render("register.ejs", {
                title:'Register',
                user:req.user,
                error: "User already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,           
            email,
            password: hashedPassword
        });
        res.redirect("/auth/login");
    } catch (error) {
        res.render("register.ejs", {
            title:'Register',
            user:req.user,
            error: error.message,
        })
    }
});


// Logout
exports.logout = asyncHandler((req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login");
    });

});