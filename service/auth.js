// const sessionIdToUserMap = new Map();  it is for the statefull authentication . now we are using jwt for stateless
const jwt = require("jsonwebtoken");
const secret = "ajay$123"


function setUser(user){
    // sessionIdToUserMap.set(id,user); // for statefull
    const payload = {
        _id : user._id,
        email :user.email,
    };
    return jwt.sign(
        {
            _id : user._id,
            email :user.email,
        },
        secret);
};

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }
};

module.exports = {
    setUser,
    getUser,
}