onmessage = (e) => {
    console.log('Worker: Message received from main script', e.data)
    console.log(10)
    for(let i=0;i<1000000000;i++){}
    const workerResult = 'workerResult';
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
}