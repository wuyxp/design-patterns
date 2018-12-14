// 定义很多策略
var regexp = {
  inNonEmpty: "\\S+",
  email       : "^\\w+@\\w+(\\.\\w+)+$",
  phone       : "^\\d{11}$",
  chinese     : "^[\u4e00-\u9fa5]+$"
};

// 对文本进行校验
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
// 定义校验对象
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

// 声明校验
var v = new Validata();

// 增加规则
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