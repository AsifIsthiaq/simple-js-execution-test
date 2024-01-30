console.log("Start")
console.log(1)
for(let i=0;i<=1000000000;i++){
    if(i==1000000000) console.log(1.1)
}
setTimeout(() => {
    console.log("setTimeout: "+2.1)
    for(let i=0;i<1000000000;i++){}
},0)
setTimeout(() => {
    console.log("setTimeout: "+2.2)
    for(let i=0;i<1000000000;i++){}
})
const promise = new Promise((resolve, reject) => {
    console.log(3)
    resolve()
})
setImmediate(() => {
    console.log("setImmediate: "+2.3)
    for(let i=0;i<1000000000;i++){}
})
promise.then(() => {
    console.log(4)
}).catch(() => {
    console.log(5)
}).finally(() => {
    console.log(6)
})
console.log("Approching End")
console.log("End")