const express=require('express')
const multer=require('multer')
const router=express.Router()
const fs=require('fs')
const path=require('path')
let upload=multer({dest:'tmp/'})

router.post('/img',upload.single('test'),(req,res)=>{
	console.log(req.file)
	fs.readFile(req.file.path,(err,data)=>{
		if(err){return res.send('上传错误')}
		let filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+"."+req.file.mimetype.split('/')[1]
		fs.writeFile(path.join(__dirname,'../admin/img',filename),data,(err)=>{
			if(err){console.log(err); return res.send("上传错误")}
			let array={
				err:0,
				msg:'ok',
				path:'img/'+filename
			}
			res.send(array)
		});
	})
})

module.exports=router;