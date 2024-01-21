const cluster = require('cluster');
const os = require('os');

// Simulated image processing function
function applyImageFilter(imageData) {
  // Simulate a computationally intensive image processing task
  // (e.g., applying a filter to each pixel)
  for (let i = 0; i < imageData.length; i++) {
    imageData[i] = imageData[i] * 2; // Example: doubling pixel values
  }
  return imageData;
}

if (cluster.isMaster) {
    console.log(`Master Process Id: ${process.pid}`);
  // Master process
  const numCPUs = os.cpus().length;
  console.log(`Master process is running on ${numCPUs} CPU core(s)`);

  // Simulate a large dataset of images
  const imagesToProcess = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    data: Array.from({ length: 10000 }, () => Math.random()), // Simulated image data
  }));

  // Distribute the images among worker processes
  const imagesPerWorker = Math.ceil(imagesToProcess.length / numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    const start = i * imagesPerWorker;
    const end = start + imagesPerWorker;
    const worker = cluster.fork();
    const imagesSubset = imagesToProcess.slice(start, end);
    worker.send({ images: imagesSubset });
  }

  // Collect results from workers
  const processedImages = [];
  for (const id in cluster.workers) {
    cluster.workers[id].on('message', (message) => {
      processedImages.push(...message.processedImages);

      // If all workers have finished, do something with the processed images
      if (processedImages.length === imagesToProcess.length) {
        console.log('All images processed:', processedImages);
        // Perform additional tasks or respond to the completion of image processing
      }
    });
  }

    // Listen for worker exit and fork a new one
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited.`);
    });
} else {
  // Worker process
  console.log(`Worker Process Id: ${process.pid}`);
  process.on('message', (message) => {
    // Process images assigned to this worker
    const processedImages = message.images.map((image) => ({
      id: image.id,
      data: applyImageFilter(image.data),
    }));

    // Send the processed images back to the master process
    process.send({ processedImages });
    process.exit(); // Terminate the worker process after completing its task
  });
}
