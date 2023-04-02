if (window.Worker) {
    console.log(8)
    const myWorker = new Worker("worker.js");
    myWorker.postMessage('postMessage')
    myWorker.onmessage = (e) => {
        console.log(9)
        console.log('Message received from worker', e.data);
    }
}
console.log(1)
//for(let i=0;i<1000000000;i++){}
setTimeout(() => {
    console.log(2)
    for(let i=0;i<1000000000;i++){}
})
const promise = new Promise((resolve, reject) => {
    console.log(3)
    resolve()
})
promise.then(() => {
    console.log(4)
}).catch(() => {
    console.log(5)
}).finally(() => {
    console.log(6)
})
console.log(7)