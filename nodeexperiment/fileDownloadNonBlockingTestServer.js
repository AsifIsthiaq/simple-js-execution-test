const http = require('http');
const https = require('https');
const fs = require('fs');
var count = 0;
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        console.log("Health-Status: Ok______" + new Date().toString());
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
    } else if (req.url.startsWith('/download')) {
        let fileUrl = req.url.split('=')[1];
        if (!fileUrl) {
            // res.writeHead(400, { 'Content-Type': 'application/json' });
            // res.end(JSON.stringify({ error: 'URL parameter is required' }));
            // return;
            fileUrl = "https://file-examples.com/storage/fec71f2ebe65d8e339e8b9c/2017/04/file_example_MP4_1920_18MG.mp4"
        }

        const localFilePath = 'file_example_MP4_1920_18MG.mp4___' + (++count);
        const fileStream = fs.createWriteStream(localFilePath);
        const protocol = fileUrl.startsWith('https') ? https : http;
        console.log(count+" download started______" + new Date().toString());
        const request = protocol.get(fileUrl, response => {
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                console.log('File download completed.______'+new Date().toString());
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File download completed' }));
            });
            fileStream.on('error', err => {
                console.error('Error downloading file:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'File download failed' }));
            });
        });

        request.on('error', err => {
            console.error('Error downloading file:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File download failed' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
