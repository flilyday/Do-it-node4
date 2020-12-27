// require함수의 원리 -> 간단하다 : 외부에서 require로 부르면 전역객체 exports를 반환하고 그것을 사용 할 수 있다.

// 1.외부에서 정의했다고 가정
var require = function(path) {
    var exports = {};
    
    exports.getUser = function() {
        return {id : 'test01', name : 'sosi'};
    }
    exports.group = {id : 'group01', name : 'friends'};

    return exports
}

// 2.메인 파일에서 불러들였다고 가정
var user = require('...')

function showUser(){
    return user.getUser().name + ', ' + user.group.name;
}
console.log('사용자 정보 : ' + showUser());