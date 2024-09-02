const MergeResponses = require('../utils/MergeResponses');
const FilterAttr = require('../utils/FilterAttr');


exports.getProfile = async (req, res) =>{
    
    try {
        
        const { options } = req.body;
        const rowsApiUrl_Attr = req.rows;
        const pin = req.pin;
        let responses = [];
        
        if(options.length===0){
            return res.status(400).json("No options Provided");
        }


        for(let i = 0; i< rowsApiUrl_Attr.length; i++){
            
            const row = rowsApiUrl_Attr[i];
            const apiurl= row.apiurl;
            const allowedAttr= row.allowedkeys;
            await fetch(apiurl, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                     apiKey: process.env.apiKey,
                },
                body: JSON.stringify({ pin, allowedAttr })
            }).then(response => response.json()).then(data => {
                
                if(typeof data === "string"){
                    return res.status(400).json(data);
                }
    
                if(options.length===1 && options[0]==="all"){

                    responses.push(data);

                }else{
                    
                    const response = FilterAttr(options, data)
                    responses.push(response);
                }
    
            })
            
        }
        
        
        const finalResponse = MergeResponses(responses);

        res.status(200).json(finalResponse);
       
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Internal Server Error profile");
    }


}