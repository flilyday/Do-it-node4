// 모듈 분리 패턴 3 : 프로토타입 객체 만들어서 New연산자로 할당
var User = require('./user10');

var user = new User('test02', 'sosi2')
user.printUser();