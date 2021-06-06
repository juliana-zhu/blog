function Animal(name){
    this.name=name
}
Animal.prototype.say = function (){
    console.log('我叫'+this.name)
}

function Tiger(name){
    Animal.call(this, name);
}

function create(parentProto){
    function Fn(){};
    Fn.prototype = parentProto;
    let fn = new Fn();
    fn.constructor = Tiger;
    return fn
}
Tiger.prototype = create(Animal.prototype)
Tiger.prototype.eat = function (){
    console.log('吃肉')
}
const tiger = new Tiger('老虎');
tiger.say();
tiger.eat();
