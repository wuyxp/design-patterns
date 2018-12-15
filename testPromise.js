const MyPromise = require('./myPromise')

new MyPromise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        resolve(2);
    }, 2000)
}).then(v => {
    console.log(v);
    return MyPromise.reject(3)
}).cache(v => {
    console.log(v)
    return new MyPromise((res) => {
        setTimeout(() => {
            res(5)
        }, 3000)
    })
}).then(v => console.log(v))