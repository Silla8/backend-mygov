const JwtVerifier = require('../utils/JwtVerifier');


const Authenticated= async(req, res) =>{

    try {

        const token = req.header("mygovToken");
       
        const verified = JwtVerifier(token);

        if(verified){
            return res.status(200).json(true);
        }else {
            return res.status(403).json(false);
        }
    } catch (error) {
        return res.status(500).json("Server Side Error");
    }
}

module.exports= Authenticated;