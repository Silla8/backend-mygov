const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const JwtGenerator = (user_id) =>{
    const payload = {
        user_id
    };

    const token =  jwt.sign(payload, process.env.SECRET, { expiresIn: "1h"});

    return token;
}

module.exports = JwtGenerator;