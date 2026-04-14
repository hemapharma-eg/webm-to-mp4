const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Enable SharedArrayBuffer for multi-threaded FFmpeg
    // Using 'credentialless' so Tailwind CSS CDN still loads
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end();
            return;
        }

        if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html');
        else if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'text/javascript');
        else if (filePath.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
        
        res.writeHead(200);
        res.end(data);
    });
});

server.listen(8080, () => {
    console.log('Secure Converter Environment running at http://localhost:8080/');
    const os = require('os');
    const { exec } = require('child_process');
    if (os.platform() === 'win32') {
        exec('start http://localhost:8080/');
    }
});
