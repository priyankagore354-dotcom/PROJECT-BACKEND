const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/packages");
    },

    filename: function(req,file,cb){
        const uniqueName =  Date.now() +"stt"+path.extname(file.originalname);
        cb(null,uniqueName)
    }
}) 

const upload = multer({
    storage:storage,
    fileFilter: function(req,file,cb){
        const supportedFiletypes = /jpeg|jpg|png|webp|octet-stream/;
        const extName = supportedFiletypes.test(path.extname(file.originalname).toLowerCase())

        const mimeType = supportedFiletypes.test(file.mimetype);


        if(extName && mimeType){
            cb(null,true);
        }else{
            cb(new Error("Only image files are allowed"))
        }
    }
})

module.exports = upload