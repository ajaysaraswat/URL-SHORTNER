const { getUser }= require("../service/auth");



async function restrictToLoggedinUserOnly(req,res,next){
    // const userUid = req.cookies?.uid;
    const userUid = req.headers["authorization"];
console.log(req.headers);
    if(!userUid) return res.redirect("/login");
    const token = userUid.split("Bearer ")[1]; // iska array ka first position par hoga token so usko le rahe hai
    const user = getUser(token);

    if(!user) return res.redirect("/login");
    req.user = user;
    next();

    
};

async function checkAuth(req,res,next){
        // const userUid = req.cookies?.uid;
        const userUid = req.headers["authorization"];
        
    const token = userUid.split("Bearer ")[1]; 
    

   
    const user = getUser(token);

    
    req.user = user;
    next();

    
};
module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}
