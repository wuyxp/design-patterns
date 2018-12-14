// new Promise(resolve => {
//   console.log(1);
//   resolve(2);
//   new Promise(resolve => {
//     console.log(4)
//     const id = setTimeout(() => {
//       resolve(5)
//       console.log(3)
//     }, 0)
//   }).then(v => console.log(v))
// }).then(value => {
//   console.log(value)
// })
// const id2 = setTimeout(() => {console.log(6)}, 0)
