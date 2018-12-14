function * iterator(){
  yield 'aaa'
  yield 'bbb'
  yield  c = 'c' + '-ccc'
  yield new Promise((resolve, reject) => {
    setTimeout(() => resolve('p'), 2000)
  })
  yield Promise.resolve('ab')
  return 'ffff'
}
const it = iterator()
console.log(it)
console.log([... iterator()])

// async function aa(){
//   const arr = [
//     await new Promise(res => setTimeout(() => res('abcccc'), 1000)), 
//     await Promise.resolve('b')
//   ]
//   for(let i=0;i<arr.length; i++){
//     console.log(arr[i])
//   }
// }
// aa()



class Iterable{
  constructor(data, sort = () => {}){
    this.data = data;
    this.sortKey = Object.keys(data).sort(sort);
  }
  [Symbol.iterator](){
    return new myIterator(this.data, this.sortKey)
  }
}

class myIterator{
  constructor(data, keys){
    this.data = data
    this.keys = keys
    this.index = 0
  }
  next(){
    let key = this.keys[this.index]
    let value = {
      key,
      value: this.data[key]
    }
    if(this.index++ < this.keys.length) {
      return new IteratorResult(value, false)
    }
    return new IteratorResult(undefined, true)
  }
}

class IteratorResult{
  constructor(value, done) {
    this.value = value;
    this.done = done;
  }
}

// 我们希望把一个无须的列表的按照顺序遍历出来
const data = {
  '1998-8-6': 'a',
  '1999-2-5': 'b',
  '2000-10-8': 'c',
  '2000-8-8': 'd',
  '2000-8-4': 'e',
  '2000-8-5': 'e1',
  '1997-8-8': 'f',
  '1999-2-1': 'g'
}
// console.log('原始对象-----');
for(let item in data){
  // console.log(`${item}----${data[item]}`)
}

const iterable = new Iterable(data, function(a, b){
  const d = a.split('-').map(i => parseInt(i, 10));
  const i = b.split('-').map(i => parseInt(i, 10));
  return (
    d[0] > i[0] || 
    (d[0] === i[0] && (d[1] > i[1])) ||
    (d[0] === i[0] && (d[1] === i[1]) && (d[2] > i[2]))
  )
});
// const result = iterable[Symbol.iterator]();
// console.log('通过iterable遍历的---------')

// console.log([...new Iterable(data)])
// for(key of iterable){
//   console.log(key)
// }
