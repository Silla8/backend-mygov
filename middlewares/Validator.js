const pool = require('../database');

const Validator = async (req, res, next) =>{
    
    try {
            if(req.route.path==="/signin"){

                const { pin, password }= req.body;
                 
                if(pin.length===0 || password.length===0  || pin.length<7 || password.length<7){
                    return res.status(400).json("Invalid Credentials");
                }

               
            }
            else if(req.route.path==="/signup"){

                const { pin, password, email }= req.body;
                 
                if(pin.length===0 || password.length===0  || pin.length<7 || password.length<7 || email.length===0 || email.split('@').length!==2 ){
                    return res.status(400).json("Invalid Credentials");
                }
            }
            else{

            if (!req.body) {
                return res.status(400).json("Bad Request");
              }
              
            const resource = req.originalUrl.split('/')[2];

            if(!resource){
                return res.status(400).json("Invalid Path");
            }

            if(resource==="profile"){

                const result = await pool.query('select allowedkeys, apiurl from api_org');

                req.rows = result.rows;

            }else{

                const result = await pool.query('select allowedkeys, apiurl from api_org where resource = $1', [resource]);

                if(!result.rows.length){
    
                    return res.status(400).json("Bad Request");
                }
               
                req.allowedAttr = result.rows[0].allowedkeys;
                req.apiUrl = result.rows[0].apiurl;
            }
            
            
        }
            next();

    } catch (error) {
        return res.status(401).json("Bad Request");
    }
    
}

module.exports= Validator;