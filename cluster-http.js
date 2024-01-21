const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running on ${numCPUs} CPU core(s)`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exit and fork a new one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Forking a new one.`);
    cluster.fork();
  });
} else {
  // Worker process
  console.log(`Worker process ${process.pid} is running`);

  // Create a simple HTTP server in each worker
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from Worker ${process.pid}`);
  }).listen(3000);
}
