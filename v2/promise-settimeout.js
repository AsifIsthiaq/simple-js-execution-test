// async function test(){
//     const maxRetries = 10;
//     let retryCount = 1;
//     while (retryCount <= maxRetries) {
//         console.log(retryCount)
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         retryCount++;
//     }
// }

// test();

function getUniqueId(realm) {
    // Generate a simple hash (Adler-32)
    let a = 1, b = 0;
    for (let i = 0; i < realm.length; i++) {
        a = (a + realm.charCodeAt(i)) % 65521;
        b = (b + a) % 65521;
    }
    const adler32 = (b << 16) | a;
    
    // Convert hash to base-36 and pad to 5 characters
    return adler32.toString(36).padStart(5, '0').slice(-5);
}


console.log(getUniqueId("ateam1"))
console.log(getUniqueId("ateam"))
console.log(getUniqueId("ateam"))
console.log(getUniqueId("ateam1"))
