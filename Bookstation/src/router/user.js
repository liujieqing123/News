const express=require('express');
const router=express.Router();
const usermodel=require('../model/userMode.js')  //引入数据模型，在接口中调用
const mail=require('../../mail.js');  //引入邮箱验证的文件
const util=require('../utlis/util.js')  //引入小工具类文件

/**
 * @api {post} /user/login/ login
 * @apiName Login
 * @apiGroup admin
 *
 * @apiParam {String} use admins unique ID.
 * @apiParam {String} pas admins unique ID.
 *
 * @apiSuccess {String} err Firstname of the admin.
 * @apiSuccess {String} msg  Lastname of the admin.
 */
let obj={};  //声明一个对象，用来存储邮箱号
//登录
router.post('/login',(req,res)=>{
	let{use,pas}=req.body;
	usermodel.find({use,pas})  //查找数据
	.then((data)=>{
		console.log(data)
		if(data.length>=1){return res.send(util.sendData(0,'登录成功',null))}
		res.send(util.sendData(-1,'登录失败',null));
	})
})

/**
 * @api {post} /user/reg/ 注册
 * @apiName reg
 * @apiGroup admin
 *
 * @apiParam {String} use admins unique ID.
 * @apiParam {String} pas admins unique ID.
 *
 * @apiSuccess {String} err Firstname of the admin.
 * @apiSuccess {String} msg  Lastname of the admin.
 */
//注册
router.post('/reg',(req,res)=>{
	let{use,pas,code}=req.body;  //我们是以邮箱作为用户名的，所以us就是邮箱
	if(obj[use]!==code){return res.send(util.sendData(-1,'验证码错误，请重新获取',null))}  //验证输入的验证码
	usermodel.insertMany({use,pas})  //插入数据
	.then((resolve)=>{
		res.send(util.sendData(0,'注册成功，请登录',null));
	})
	.catch((err)=>{
	    res.send(util.sendData(-1,'注册失败',null));
	})
	
})

/**
 * @api {post} /user/getcode/ 获取邮箱验证码
 * @apiName getcode
 * @apiGroup admin
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccess {String} err Firstname of the admin.
 * @apiSuccess {String} msg  Lastname of the admin.
 */
//获取邮箱验证码
router.post('/getcode',(req,res)=>{
	let {email}=req.body;
	if(!email||email==""){return res.send(util.sendData(-1,'参数错误',null))}  //如果填写的不是邮箱或者不填写邮箱，返回参数错误
	let num1=(parseInt(Math.random(0,1)*1000)).toString();  //生成随机验证码
	mail.sendmail(email,num1)
	.then((resolve)=>{
		obj[email]=num1; //把验证码存到email的数组里
		console.log(obj);
		res.send(util.sendData(0,'验证码发送成功',null))
		})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
		})
})

module.exports=router;