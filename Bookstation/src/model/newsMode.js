const mongoose=require('mongoose');
let Schema=mongoose.Schema;

//声明Schema对象
let newsSchema=new Schema({
	titel:{type:String,required:true},
	img:{type:String,required:true},
	desc:{type:String,required:true},
	type:{type:String,required:true},
	time:{type:String,required:true}
})

//声明模型
let newsmodel=mongoose.model('news',newsSchema);

//抛出模型
module.exports=newsmodel;
