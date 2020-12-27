// ** config(port, db) 관련부분만 모듈화시켜서 빼는 실습 ** //

// Mongodb와 express 연결시키기 위한 기초작업
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 사용자 라우트 모듈 불러오기
var user = require('./routes/user');

// Config로 분리한 설정 관련 모듈 불러오기
var config = require('./config')

// database_loader 모듈 불러오기
var database_loader = require('./database/database_loader');

// 암호화 모듈 사용
var crypto = require('crypto');

// mongoose 모듈 사용
var mongoose = require('mongoose')

var database;
var UserSchema;

var app = express();

console.log('server ports -> ' + config.server_ports)
app.set('port', config.server_ports || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));

var router = express.Router();

router.route('/process/login').post(user.login);

router.route('/process/adduser').post(user.adduser);

router.route('/process/listuser').post(user.listuser);

app.use('/', router);

var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express함수를 실행함 : ' + app.get('port'))
    database.init(app. config);    
})