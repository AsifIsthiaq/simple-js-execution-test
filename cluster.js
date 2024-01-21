const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // Master process
  const numCPUs = os.cpus().length;

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

  // Simulate some CPU-intensive task
  const result = performCPUIntensiveTask();
  console.log(`Worker ${process.pid} completed: ${result}`);
}

function performCPUIntensiveTask() {
  // Simulate a CPU-intensive task
  let result = 0;
  for (let i = 0; i < 1e9; i++) {
  // for (let i = 0; i < 10000000; i++) {
    result += i;
  }
  return result;
}
