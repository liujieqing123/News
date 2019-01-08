'use strict';
const nodemailer = require('nodemailer');

//nodemailer.createTestAccount((err, account) => {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'qq', //邮箱的服务商
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: "1872884848@qq.com", // 默认邮箱
		pass: "ftaauvxaoahhbdbb" //smtp 授权码
	}
});
// send mail with defined transport object
function sendmail(mail, msg) {
	return new Promise((resolve, reject) => {
		// 发送邮件相关信息
		let mailOptions = {
			from: '1872884848@qq.com', // 发送信息的邮箱
			to: mail, // 接收信息的邮箱
			subject: 'xxx管理平台', // Subject line
			text: msg, // plain text body
//			html: '<b>Hello world?</b>' // html body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if(error) {
				reject(error)
			}
			    resolve('ok')
		})
	})
}
module.exports = {sendmail}; //抛出
//});