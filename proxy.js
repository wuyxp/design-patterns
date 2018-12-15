class CEO{
    getPhoneNo(){
        return '188-8888-8888'
    }
}
class Secretary{
    constructor(ceo){
        this.ceo = ceo
    }
    getPhoneNo(other){
        if(other === 'ceo'){
            return this.ceo.getPhoneNo()
        }
        return '010-888888'
    }
}
const sec = new Secretary(new CEO())
// console.log(sec.getPhoneNo('ceo')) // 188-8888-8888
// console.log(sec.getPhoneNo())   // 010-888888


class MVVM{
    constructor(){
        this.data = {
            name: '花花',
            age: 18,
            sex: '女',
            _weight: 300
        }
    }
}

const mvvm = new Proxy(new MVVM(), {
    get(target, key){
        const data = target.data;
        if(key[0] === '_'){
            return '不告诉你'
        }else{
            // console.log(`获取了${key}`)
            return data[key]
        }
    },
    set(target, key, value){
        const data = target.data;
        if(key[0] === '_'){
            return '这个你不能设置哦~'
        }else{
            // console.log(`设置了${key}是${value}`)
            data[key] = value
        } 
    }
})
console.log(mvvm)
console.log(mvvm.name)
console.log(mvvm._weight)
mvvm.age = 81
mvvm._weight = 80
console.log(mvvm)
