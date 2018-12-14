const 
class Singleton {
    login(){
        console.log('登录框')
    }
}
Singleton.getInstance = (() => {
    let instance = null
    return () => {
        if(!instance){
            instance = new Singleton();
        }
        return instance
    }
})()

const s1 = Singleton.getInstance();
s1.login()
const s2 = Singleton.getInstance();
s2.login()
console.log(s1 === s2)


console.log('--------------')

class ShoppingCar {
    constructor(){
        if(ShoppingCar.instance){
            return ShoppingCar.instance   
        }
        this.list = []
        ShoppingCar.instance = this
    }
    
    print(){
        console.log(this.list.join('\n'))
    }
    add(goods){
        this.list.push(goods)
    }
    delete(){
        this.list.pop()
    }
    empty(){
        this.list = []
    }
}
ShoppingCar.instance = null

const sc1 = new ShoppingCar()
const sc2 = new ShoppingCar()
sc1.print()
sc2.print()
sc1.add('香烟')
sc1.print()
sc2.print()
console.log(sc1 === sc2)
