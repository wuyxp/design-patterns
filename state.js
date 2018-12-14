class Context{
  constructor(state){
    this._state = state
  }
  changeState(state){
    const _oldState = this._state
    this._state = state
    this.request(_oldState, state)
  }
  request(oldState, state){
    console.log(`状态发生从${oldState.state}变化成了${state.state}`)
  }
}

class State{
  constructor(state){
    this.state = state
  }
  handle(){

  }
}

const red = new State('red');
const yellow = new State('yellow');
const blur = new State('blur');


const cont = new Context(red);
cont.changeState(yellow)
cont.changeState(blur)
cont.changeState(red)