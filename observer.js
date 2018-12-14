class Subject{
  constructor(){
    this.observers = []
    this._state = {}
  }
  getState(){
    return this._state
  }
  setState(state){
    this._state = Object.assign({}, this._state, state)
  }
  on(observer){
    console.log(`有观察者进行了开始观察${observer.name}`)
    this.observers.push(observer);
  }
  emit(){
    this.observers.forEach(observer => {
      observer.updata && observer.updata(this.getState())
    });
  }
  off(observer){
    if(observer){
      console.log(`观察者${observer.name}离开了`)
      this.observers = this.observers.filter(item => item !== observer)
    } else {
      console.log(`观察者都离开了`)
      this.observers = []
    }
  }

}
class Observer{
  constructor(name){
    this.name = name
  }
  updata(state){
    console.log(`观察者${this.name}观察到了，state的变化为${JSON.stringify(state)}`)
  }
}

const subject = new Subject;
const o1 = new Observer('o1');
const o2 = new Observer('o2')

subject.on(o1)
subject.on(o2)
subject.setState({
  'message': 'holle'
})
subject.emit()
subject.off(o1)
subject.setState({
  'message': 'bey bey'
})
subject.emit()
subject.off()
subject.emit()


var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('ask', function() { 
    console.log('在吗'); 
}); 
event.on('ask', function() { 
  console.log('吃了吗'); 
}); 
event.on('ask', function() { 
  console.log('睡了吗'); 
}); 
event.on('answer', function() { 
  console.log('哦'); 
}); 
event.on('answer', function() { 
  console.log('呵呵'); 
}); 
event.on('answer', function() { 
  console.log('睡了'); 
}); 
setTimeout(function() { 
    event.emit('ask'); 
}, 500);
setTimeout(function() { 
    event.emit('answer'); 
}, 1000);