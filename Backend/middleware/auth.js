const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token){
            return res.json({ message: "Unauthorized!" });
        }
        
        const response = jwt.verify(token, "thepotatoishungry")

        if (!response) {
            return res.status(403).json({ message: "Forbidden!" });
        }

        else {
           res.json({ message: "Authorized!", username: response.appUser });
           req.info = decode;
            return next(); 
        }


        //  await jwt.verify(token, "thisisasecretkey", (err, decode) => {
        //   if (err) {
        //     res.json({ message: "Forbidden!" });
        //   } else if (decode) {
        //     res.json({ message: "Authorized!" ,  username : decode.appUser });
        //     console.log(decode)
        //   }

    }
    catch (error) { 
        res.status(500).json({ message: `${error}` });
    }

    
};

module.exports = authHandler
