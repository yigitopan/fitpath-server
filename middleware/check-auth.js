const HttpError = require("../models/http-error");
const JWT = require("jsonwebtoken");
const User = require("../models/user-model")

const checkAuth = async (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;
    try {
        decodedToken = JWT.verify(token,"bebelak");
        existingUser = await User.findOne({_id: decodedToken.userId});
    }
    catch (err) {
        const error = new HttpError("Verifikasyon başarısız. Lütfen site sahibiyle iletişime geçin",401)
        return next(error);
    }
    if(!decodedToken) {
        const error = new HttpError("Not authed", 401);
        throw error;
    }

    console.log(decodedToken)
    
    res.locals.decodedId = decodedToken.userId

    if(req.body.loginArkasi === true) {
        console.log("hopp")
        res.json({auth:true, userLoggedIn: {name:existingUser.name, userId:existingUser._id}});
    }

    else {
        console.log("hopp2")
        req.auth=true,
        req.userLoggedIn=true,
        req.name = existingUser.name
        next();
    }
    //auth-action da hata aliyoruz cunku response verecek bir sey yok. sadece isAuth cagirinca next() yapiyoruz 
    //next yok. response verecek bir sey yok, O yuzden res. li hali calisinca calisiyor.
    
}

module.exports = checkAuth;