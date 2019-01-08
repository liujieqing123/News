const mongoose=require('mongoose');  //引入数据库
//链接数据库
mongoose.connect('mongodb://localhost:27017/admin',{useNewUrlParser:true});  //admin需要链接的数据库
//创建数据库对象
let db = mongoose.connection;

//监听数据库链接错误
//数据库链接错误时
db.on('error',()=>{console.log('connection error:')})

//数据库链接错误时
db.on('open',function(){
	console.log(" we're connected!")
});

//数据库链接断开时
db.on('disconnected',function(){
	console.log('数据库链接断开')
});
