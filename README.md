## 这是只是代码的提供共享
## 重要
对设计模式的详细介绍在语雀上
https://www.yuque.com/wuyxp/design-patterns/rf5p9g
请访问这个

导言
本系列设计模式的参考主要参考了慕课网双越老师的《Javascript 设计模式系统讲解与应用》（链接地址：https://coding.imooc.com/class/255.html ）。当然我是个付费用户（本人比较提倡知识付费）。另外还参考了博客园里汤姆大叔的博客（链接地址：https://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html），就这样经过了我自己的一些理解，和我以前的几个例子，当然也是为了公司内部分享，所以我就写了这么一个系列的算是个人总结吧。
以下都是本人的个人见解，如果不同理解可以轻喷。
在网上一直对设计模式的准确性，和每个设计模式的标准公式性都有很多的争论，尤其是23种设计模式理论的提出，更是让一些开发者或者是希望学习到设计模式的程序员都感觉到了一丝迷茫。那么迷茫是从哪里来的，我按照自己的理解是，迷茫来源有二：
一是编程语言的差异，我本人是个js开发者，而按照设计模式的设定，具有设计模式的程序认为最小单元应该是对象。那么问题就来了，js在ES6之前本身就是面向对象不是那么明显，尤其是继承的写法，更别提私有属性、私有方法、接口、抽象类了。所以这就会影响js程序员很难接受到比较所谓正统的设计模式。
二是前端的业务性，当然我这应该主要是针对于大部分的业务开发者，作为一个前端工程师，如果你个人很少有涉及到公共模块，或者是底层框架设计等这样大而全的需求时，就会影响你的个人能力的提高，尤其是现在react等这种大型框架的兴起。更是让业务开发者接触不到去设计一个模块的思想了，当然不是说业务开发者写不出好代码。我只是相对的来说一下，如果我们一直去做业务，并且也不没有去很好的总结我们写过的代码，那么我们就很有可能不去了解设计模式了。
那我以前虽然看过一些设计模式，但是因为有这两点原因，总是对设计模式模模糊糊，虽然能大概说出来几种，但是根本不知道里面的区别，更别说灵活运用了。那我通过了双越老师的视频学习，然后再回想之前写过得代码，我感觉业务代码也可以写的很漂亮，一个简单的需求我们也可以去深入的思考。那么这个时候我认为，这不仅仅是一个语法或者是api使用的提高了，而是整个人对项目想法的架构思考了，我相信这也是每一个程序员最终追求的。

那么我下面的篇章主要会分为三个部分：
第一部分： 面向对象和UML类图
这里不会去写一些对象的深入使用，比如对象的属性类型，对象的属性方法等。我会写对象是怎么表示数据的，并且怎么处理私有属性。然后我们怎么去通过画图来表示各个对象之间的关系。其实这是学习设计模式最基础的基本功。并且我会配有三个题来讲解UML类图的画法。
第二部分：一部分设计模式
为什么说一部分，这里主要是相对于23中设计模式来说，在js中因为缺少了抽象类和接口，并且有的设计模式确实出现的也少，所以我就挑选了特别常见的9种设计模式来讲。这里面会有各种各样的小技巧，比如new 出来的两个对象，是个全等的。怎么将当前对象的data属性里面的数据绑定到当前对象上。也会出现比较复杂的程序、比如实现一个对象的遍历，手写promise，手写mvvm结构等。虽然这些都很难，但是这都是设计模式应用的提现，比起干巴巴的概念叙述会更加的让你深入理解设计模式到底干了什么事。
第三部分：一个综合示例
这里我会采用一个购物车的例子，会尽量多的去演示上面的设计模式，这部分还没有写。

总结：
我上面所总结的设计模式可能会被人认为不是正统的设计模式，里面的有些理解也有可能不到位，但是这就好比有人问我，到底是保定的驴肉火烧正宗还是北京这边的驴肉火烧正宗，我想说的是，好吃的就是正宗的。所以有些问题不要去费力气的抬杠了。与其说谁的设计模式更加的符合23种设计模式，倒不如关心一点实际情况，去真正的解决一些事情。这也是我个人理解并且要分享出来的原因。
另外河南烩面还是要加粉条才好吃。虽然不正宗。但是我喜欢。