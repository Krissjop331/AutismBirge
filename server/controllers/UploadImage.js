const db = require('../models/index');
const Image = db.Image;



class UploadImage {

    async uploadImage(req, res) {
        try {
            let image = req.file.path;
            // let images = await Image.create({
            //     url: image
            // })
    
            // if(!images) {
            //     return res.status(200).json({error: "Ошибка"})
            // }
    
            return res.status(201).json({images: image})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }   

}


module.exports = new UploadImage();