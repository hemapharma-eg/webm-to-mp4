const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // These headers instantly unlock multi-threaded high-performance WASM processing globally!
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end();
            return;
        }

        if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html');
        else if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'text/javascript');
        
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
