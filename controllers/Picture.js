const pool = require('../database');


exports.getPicture = async(req, res)=>{
    try {

        const user_id= req.user_id;

        const result = await pool.query('select imageurl from users where user_id = $1', [user_id]);
        if(result.rows.length){
           
            return res.status(200).json({imageUrl: result.rows[0].imageurl});
        }

        res.status(500).json("Error fetching the image url");

    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

exports.putPicture = async (req, res)=>{
    try {
        
        const user_id = req.user_id;
        const url = req.protocol + '://' + req.get('host');
        const imageUrl = url + '/images/' + req.file.filename;
        
        const result = await pool.query('update users set imageurl = $1 where user_id = $2', [imageUrl, user_id]);

        if(result.rowCount===1){
            return res.status(200).json("Image uploaded Successfully");
        }

        res.status(500).json("Uploading Image unsccessful");



    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Internal Server Error");
    }
}