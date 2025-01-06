// middleware -> an object that has access to req and res objects

module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
    }
    redirect("/auth/login");
},
}