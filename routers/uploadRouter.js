const express = require("express");
const bodyParser = require("body-parser");
const validation = require("../validation/validateToken");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { //If the file uploaded is not any of this file type
        return cb(new Error("You can upload only image files"), false);
    }
    cb(null, true)
};


//Here we configure what our storage and filefilter will be. And it is storage and imageFileFilter we created above
const upload = multer({storage: storage, fileFilter: imageFileFilter})

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route("/")
.get(validation.verifyUser,validation.verifyAdmin,(req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
})
.post(validation.verifyUser,validation.verifyAdmin,upload.single("imageFile"),(req, res, next)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(req.file);
})
.put(validation.verifyUser,validation.verifyAdmin,(req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
})
.delete(validation.verifyUser,validation.verifyAdmin,(req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
})


module.exports = uploadRouter;