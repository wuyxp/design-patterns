class Algorithm{
  constructor(){
    this.algorithm = new Map()
  }
  setStrategy(key, strategy){
    this.algorithm.set(key, strategy.getStrategy())
  }
  getStrategy(key){
    return this.algorithm.get(key)
  }
  listStrategy(){
    return this.algorithm
  }
}
class Strategy{
  constructor(_strategy){
    this._strategy = _strategy
  }
  getStrategy(){
    return this._strategy
  }
}

const algorithm = new Algorithm()
algorithm.setStrategy('email', new Strategy("^\\w+@\\w+(\\.\\w+)+$"))
algorithm.setStrategy('phone', new Strategy("^\\d{11}$"))
algorithm.setStrategy('chinese', new Strategy("^[\u4e00-\u9fa5]+$"))
// console.log(algorithm.getStrategy('email')) //"^\\w+@\\w+(\\.\\w+)+$" 

// console.log(algorithm.listStrategy())



const regexpAlgorithm = new Map([
  ["inNonEmpty" , "\\S+"],
  ["email" , "^\\w+@\\w+(\\.\\w+)+$"],
  ["phone" , "^\\d{11}$"],
  ["chinese" , "^[\u4e00-\u9fa5]+$"]
])
// console.log(regexpAlgorithm)

class Validata{
  constructor(algorithm){
    this.regexpAlgorithm = algorithm;
    this.formStrategy = {}
  }
  checkAll(formData){
    let message = []
    for(let key in formData){
      message.push(this.check(formData[key], this.formStrategy[key]))
    }
    return message
  }
  add(key, regexpStrategy){
    this.formStrategy[key] = Object.assign({} ,this.formStrategy[key], regexpStrategy)
  }
  check(value, regexts){
    for(let regext in regexts){
      const regexp = new RegExp(this.regexpAlgorithm.get(regext));
      if(!regexp.test(value)){
        return regexts[regext]
      }
    }
    return true
  }
}

class TextValidata{
  constructor(){
    this.validata = new Validata(regexpAlgorithm);
    this.formData = {
      name: '',
      email: '',
      phone: '',
      chinese: ''
    }
    this.initValidata()
  }
  initValidata(){
    this.validata.add('name', {
      'inNonEmpty': '名称不能为空'
    });
    this.validata.add('email', {
      'inNonEmpty': '邮箱不能为空',
      'email': '邮箱格式不正确'
    });
    this.validata.add('phone', {
      'inNonEmpty': '手机不能为空',
      'phone': '手机格式不正确'
    });
    this.validata.add('chinese', {
      'inNonEmpty': '中文名称不能为空',
      'chinese': '中文名称格式不正确'
    });
  }
  setFormData([name, email, phone, chinese]){
    this.formData = {
      name,
      email,
      phone,
      chinese
    }
  }
  check(){
    return this.validata.checkAll(this.formData)
  }
}

const textValidata = new TextValidata()
textValidata.setFormData(['', '', '', '']);
console.log(textValidata.check())

textValidata.setFormData(['xxx', 'xxx', 'xxx', 'xxx'])
console.log(textValidata.check())

textValidata.setFormData(['xxx', 'xxx@xxx.xxx', 'xxx', 'xxx'])
console.log(textValidata.check())

textValidata.setFormData(['xxx', 'xxx@xxx.xxx', '18300000000', 'xxx'])
console.log(textValidata.check())

/*

function reg(rules) {
  var str = $(this).val() || $(this).html() || "";
  var reg = regexp[rules.strategy] || rules.strategy;
  var err = rules.error;
  var r = new RegExp(reg);
  return {
    obj: $(this),
    isTrue: !r.test(str),
    err: err
  }
}
var Validata = function () {
  this.rulFn = []; //缓存校验函数
  this.error = []; //缓存错误信息
};
Validata.prototype.add = function (obj, rules) {
  var _this = this;
  if (Array.isArray(rules)) {
    rules.forEach(function (v) {
      _this.rulFn.push(
        reg.bind(obj, v)
      )
    });
  } else {
    this.rulFn.push(
      reg.bind(obj, rules)
    )
  }
};
Validata.prototype.start = function () {
  this.clear();
  for (var i = 0; i < this.rulFn.length; i++) {
    var r = this.rulFn[i].call(this);
    if (r.isTrue) {
      this.error.push(r);
    };
  }
  return this.error;
};
Validata.prototype.clear = function () {
  this.error = [];
}
var v = new Validata();
v.add($("#TextPre"), {
  "strategy": "inNonEmpty",
  "error": "通知标题不能为空"
});
v.add($("#Text"), {
  "strategy": "inNonEmpty",
  "error": "通知内容不能为空"
});
v.add($("#reward"), [{
  "strategy": "inNonEmpty",
  "error": "绿钞数量不能为空"
}, {
  "strategy": "^\\d+$",
  "error": "绿钞数量必须为数字"
}]);
v.add($("#game_version"), {
  "strategy": "^\\d+",
  "error": "请选择游戏版本"
});


v.start()
*/