class Target{
    constructor(adaptee) {
        this.adaptee = adaptee
    }
    request(){
        this.adaptee.specificRequest()
    }
}
class Adaptee{
    specificRequest(){
        console.log('不好调用的过期接口')
    }
}
new Target(new Adaptee).request()