// 모듈 분리 패턴 2 : 인스턴스 객체를 만들어 할당
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

module.exports = new User('test01', 'sosi');