// 모듈 분리 패턴 3 : 프로토타입 객체 만들어서 New연산자로 할당
function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getuser = function(){
    return {id:this.id, name:this.name};
}

User.prototype.group = {id:'group01', name:'friends'}

User.prototype.printUser = function(){
    console.log('user이름 : ' + this.name + ', group : ' + this.group.name);
}

module.exports = User;