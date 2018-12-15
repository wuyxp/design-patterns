class State {
    constructor(handle) {
        this.enum = {
            PADDING: Symbol(),
            REJECT: Symbol(),
            RESOLVE: Symbol()
        }
        this.handle = handle
        this.value = this.enum.PADDING
    }
    toReject(params) {
        if (this.value === this.enum.PADDING) {
            this.value = this.enum.REJECT;
            this.handle.toReject(params);
        }
    }
    toResolve(params) {
        if (this.value === this.enum.PADDING) {
            this.value = this.enum.RESOLVE;
            this.handle.toResolve(params);
        }
    }
    getState() {
        return this.value;
    }
    isPadding() {
        return this.getState() === this.enum.PADDING
    }
    isReject() {
        return this.getState() === this.enum.REJECT
    }
    isResolve() {
        return this.getState() === this.enum.RESOLVE
    }
}

/**
 * 采用观察者模式，用来监听所有的等待状态的事件。
 */
class Subject {
    constructor() {
        this.observers = []
    }
    on(observer) {
        this.observers.push(observer);
    }
    emit() {
        this.observers.forEach(observer => {
            observer.updata && observer.updata()
        });
    }
}

class Observer {
    constructor(updata) {
        this.updata = updata
    }
    updata(state) {
        this.updata(state)
    }
}

class MyPromise {
    constructor(callback) {
        if (typeof callback !== "function") {
            throw new Error('参数必须是函数')
        }
        // 为状态机进行初始化配置
        const resolveCallBack = result => {
            this.value = result;
            this.resolveCallBacks.emit()
        };
        const rejectCallBack = result => {
            this.value = result;
            this.rejectCallBacks.emit()
        };
        this.state = new State({
            toResolve: resolveCallBack.bind(this),
            toReject: rejectCallBack.bind(this)
        });
        this.value = undefined;
        // 创建观察者对象
        this.resolveCallBacks = new Subject();
        this.rejectCallBacks = new Subject();
        setTimeout(() => {
            // 这里到事件的末尾再执行回调操作
            callback(this._resolve.bind(this), this._reject.bind(this))
        }, 100)
    }
    _resolve(result) {
        this.state.toResolve(result)
    }
    _reject(result) {
        this.state.toReject(result)
    }
    // 处理then方法，设置默认参数
    then(resolveCallback = v => v, rejectCallback = v => { throw v }) {
        /**
         * then必须要返回新的promise
         * 如果then里面没有传递参数，那么则需要透传
         * 采用观察者模式，将promise的参数制造出来，或者是用来生成观察者对象
         */
        const createMyPromise = callback => (resolve, reject) => {
            const x = callback(this.value)
            setTimeout(() => {
                // 这里的获取结果必须都要延迟进行，因为要等待promise的CallBack执行完毕，否则获取的当前的promise的state是不准确的
                resolutionProcedure(this, x, resolve, reject);
            }, 200)
        }
        if (this.state.isResolve()) {
            return new MyPromise(createMyPromise(resolveCallback))
        }
        else if (this.state.isReject()) {
            return new MyPromise(createMyPromise(rejectCallback))
        }
        else if (this.state.isPadding()) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallBacks.on(new Observer(() => createMyPromise(resolveCallback)(resolve, reject)))
                this.rejectCallBacks.on(new Observer(() => createMyPromise(rejectCallback)(resolve, reject)));
            });
        }
    }
    // 捕获异常
    cache(cacheCallback) {
        return this.then(undefined, cacheCallback)
    }
}
MyPromise.resolve = function () {
    return new MyPromise((resolve, reject) => {
        resolve(param)
    })
};
MyPromise.reject = function (param) {
    return new MyPromise((resolve, reject) => {
        reject(param)
    })
};

/**
 * 这里主要处理几个规则
 * 1. 如果计算结果是MyPromise类型
 * 3. 剩下的则直接返回resolve(x)
 * @param {新生成的Promise实例} promise2 
 * @param {上个函数对应执行结果} x 
 * @param {新生成Promise实例的resolve方法} resolve 
 * @param {新生成Promise实例的reject方法} reject 
 */
function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new Error("互相引用错误"));
    }
    if (x instanceof MyPromise) {
        if (x.state.isPadding()) {
            x.then((value) => {
                resolutionProcedure(promise2, value, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else {
        resolve(x);
    }
}

module.exports = MyPromise
