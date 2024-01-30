async function getTotalTransaction() {
  let username = "epaga"
  const apiUrl = `https://jsonmock.hackerrank.com/api/article_users?username=${username}`
  const https = require('https')
  return new Promise((resolve, reject) => {
    https.get(apiUrl, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        // console.log(data);
        if (data && data.data && data.data.length > 0) {
          // console.log(data.data[0].id);
          const apiUrl2 = `https://jsonmock.hackerrank.com/api/transactions?&userId=${data.data[0].id}`
          https.get(apiUrl2, res => {
            let data2 = '';
            res.on('data', chunk => {
              data2 += chunk;
            });
            res.on('end', () => {
              data2 = JSON.parse(data2);
              // console.log(data2);
              if (data2 && data2.data) {
                // console.log(data2.total);
                resolve(data2.total);
              }
            })
          }).on('error', err => {
            console.log(err.message);
            reject(err)
          })
        }
        else {
          resolve("Username Not Found");
        }
      })
    }).on('error', err => {
      console.log(err.message);
      reject(err)
    })
  })
}

// getTotalTransaction().then(res => console.log(res));

async function getResult(){
  try{
    let res = await getTotalTransaction()
    console.log(res);
  }
  catch(err){
    console.error(err);
  }
}

getResult();