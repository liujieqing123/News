const mongoose=require('mongoose'); //引入mongoose
const dbconnet=require('../../dbconnect.js')  
let Schema = mongoose.Schema;

//声明一个Schema对象
let userSchema=new Schema({
	use:{type:String,required:true},  // type 字段类型  required 是否必须
	pas:{type:String,required:true}
})

//声明模型
let usermodel=mongoose.model('admin',userSchema);
 //参数1  集合名字(即链接的数据库名字)  参数2是 schema对象 将schema对象变成model
 
//抛出模型
module.exports=usermodel

//插入一条数据做测试，里面的方法用的都是promise类型，要用promise输出
//usermodel.insertMany({use:'lin',pas:'123'})
//.then((data)=>{
//	console.log(data)
//})
//
//.catch((err)=>{
//	console.log('err')
//})
