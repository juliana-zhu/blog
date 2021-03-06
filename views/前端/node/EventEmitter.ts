type IListener = typeof Function;
function EventEmitter(){
    this.events = {} as Record<string, IListener[]>
}
EventEmitter.prototype.addEventListener = function (type:string, listener:IListener){
    if(!this.events[type]){
        this.events[type] = [listener]
    }else{
        this.events[type].push(listener)
    }
}
EventEmitter.prototype.removeListener = function (type:string, listener:IListener){
    if(this.events[type]){
        this.event[type] = this.events[type].filter(l=>l!==listener)
    }
}
EventEmitter.prototype.once = function (type:string, listener:IListener){
    const wrap = ()=>{
        listener.apply(this);
        this.removeListener(type, wrap)
    }
    this.addEventListener(type, wrap);
}
EventEmitter.prototype.emit = function (type, ...rest){
    this.event[type] && this.events[type].forEach(listener=>listener.apply(this,rest))
}
