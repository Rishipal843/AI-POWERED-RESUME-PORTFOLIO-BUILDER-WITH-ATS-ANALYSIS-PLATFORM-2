const multer=require("multer")
const mystorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
filename:(req,file,cb)=>{
   cb(null,file.originalname)
}
})
const upload=multer({storage:mystorage,
      limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
})

module.exports=upload