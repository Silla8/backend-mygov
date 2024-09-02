const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();


const JwtVerifier = (token)=>{
    try {
        const verified = jwt.verify(token, process.env.SECRET); 
        return verified;
    } catch (error) {
        return false;
    }
    
}


module.exports= JwtVerifier;