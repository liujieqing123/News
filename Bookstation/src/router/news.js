const express=require('express');
const router=express.Router();
const newsmodel=require('../model/newsMode.js')  //引入数据模型，在接口中调用
const mail=require('../../mail.js');  //引入邮箱验证的文件
const util=require('../utlis/util.js')  //引入小工具类文件



//新闻列表
router.post('/newslist',(req,res)=>{
	let pagesize=Number(req.body.pagesize);  //每一页的条数
	let target=Number(req.body.target);  //第几页
	let total=0;   //先声明总数为0
	newsmodel.find()  //查找数据
	.then((res)=>{
		total=res.length   //数据的总条数
		return newsmodel.find().limit(pagesize).skip((target-1)*pagesize)  //查找数据
	})
	.then((data)=>{
		let array={total:total,newslist:data}   //声明一个数组
		res.send(util.sendData(0,'请求成功',array))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'请求失败',null))
	})
})

//添加新闻
router.post('/addnews',(req,res)=>{
//	let newsdata=[{titel:'我和国旗合个影',img:'xxx',desc:'爱国你就大声说出来',type:'快讯'},
//	              {titel:'我和国旗合个影',img:'xxx',desc:'爱国你就大声说出来',type:'社会'}]  //先声明一组假数据
    let {titel,img,desc,type,time}=req.body;
	newsmodel.insertMany({titel,img,desc,type,time})  //添加数据
	.then((data)=>{
		res.send(util.sendData(0,'添加成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'添加失败',null))
	})
})

//删除新闻
router.post('/delnews',(req,res)=>{
	let id=req.body.id;
	if(!id){res.send(util.sendData(-1,'参数错误',null))}
	newsmodel.deleteOne({_id:id})  //查找数据
	.then((data)=>{
		res.send(util.sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
	})
})

//分类查询
router.post('/newsByType',(req,res)=>{
	let type=req.body.type;
	if(!type){res.send(util.sendData(-1,'参数错误',null))}
	newsmodel.find({type:type})  //查找数据
	.then((data)=>{
		res.send(util.sendData(0,'查询成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})

//按id查询信息
router.post('/newsByid',(req,res)=>{
	let id=req.body.id;
	console.log(id)
	if(!id){res.send(util.sendData(-1,'参数错误',null))}
	newsmodel.find({_id:id})  //查找数据
	.then((data)=>{
		res.send(util.sendData(0,'查询成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})

module.exports=router;