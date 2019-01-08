const express=require('express');//引入express插件
const app= express();
const bodyParser=require('body-parser');  //引入解析post参数的插件
const path=require('path');  //引入path

//post参数解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//开启静态文件admin
app.use('/admin',express.static(path.join(__dirname,'./src/admin')))

//引入路由
const user=require('./src/router/user.js')
const news=require('./src/router/news.js')
const upload=require('./src/router/upload.js')


//使用路由
app.use('/api/user',user)
app.use('/api/news',news)
app.use('/api/upload',upload)



app.listen('9000',()=>{
	console.log('服务器开启');
});
