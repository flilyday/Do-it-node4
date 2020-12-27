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

function connectDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database = mongoose.connection;

    database.on('open', function(){
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);     
        
        createUserSchema(database);
    });
    
    database.on('disconnected', function(){
        console.log('데이터베이스 연결 끊어짐');
    });

    database.on('error', console.error.bind(console, 'mongoose 연결 에러'));

    app.set('database', database)
   
}

function createUserSchema(database) {
    database.userSchema = require('./database/user_schema').createSchema(mongoose); 

    database.UserModel = mongoose.model('users3', database.UserSchema);
    console.log('UserModel 정의함');  

}

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
    connectDB();
})