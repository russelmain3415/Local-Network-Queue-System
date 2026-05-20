const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const JSONDatabase = require('./database.js');

const PORT = 80;
const DATA_FILE = path.join(__dirname, '..', 'data.json');

const db = new JSONDatabase(DATA_FILE, {
    counters: [],
    queue: [],
    nextTicket: 1,
    counts: {},
    status: {},
    history: []
});

let serverData = db.data;

const networkInterfaces = os.networkInterfaces();
let localIp = 'localhost';
for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const addr of addresses) {
        if (addr.family === 'IPv4' && !addr.internal) {
            localIp = addr.address;
            break;
        }
    }
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    
    
    const allowedIps = ['127.0.0.1', '::1', '192.168.1.10', '192.168.1.11']; 

    
    const remoteIp = req.connection.remoteAddress;
    
    
    const isLocal = true;
    
    if (!isLocal) {
        res.writeHead(403);
        res.end('Access Denied: Unauthorized Network');
        return;
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/server.php' || req.url === '/data') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const postData = JSON.parse(body);
                    
                    
                    const pin = postData.auth_pin;
                    let cId = postData.auth_counter;
                    
                    
                    if (cId && cId !== "00" && cId !== undefined) {
                        cId = cId.toString().padStart(2, '0');
                    }
                    
                    const expectedPin = "MP-" + (cId || "00");

                    
                    if (!pin || pin.toString().toUpperCase() !== expectedPin.toUpperCase()) {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'UNAUTHORIZED: WRONG PIN' }));
                        return;
                    }

                    
                    const sanitize = (obj) => {
                        for (let key in obj) {
                            if (typeof obj[key] === 'string') {
                                obj[key] = obj[key].replace(/<[^>]*>?/gm, '');
                            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                                sanitize(obj[key]);
                            }
                        }
                    };
                    sanitize(postData);

                    
                    delete postData.auth_pin;
                    delete postData.auth_counter;

                    
                    
                    if (serverData) {
                        if (!serverData.history) serverData.history = [];
                        
                        const snapshot = JSON.parse(JSON.stringify(serverData));
                        delete snapshot.history; 
                        serverData.history.unshift(snapshot);
                        if (serverData.history.length > 20) serverData.history.pop();
                        
                        
                        postData.history = serverData.history;
                    }

                    serverData = postData;
                    db.data = serverData; // Sync our db instance
                    db.save();
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success' }));
                } catch (e) {
                    res.writeHead(400);
                    res.end('Invalid JSON');
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(serverData));
        }
        return;
    }

        let reqUrl = req.url;
    if (reqUrl.startsWith('/counter_')) {
        reqUrl = '/counters' + reqUrl;
    }

    let filePath = path.join(__dirname, '..', reqUrl === '/' ? 'info_desk.html' : reqUrl);
    const ext = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`--- NBI QUEUE SERVER STARTING ---`);
    console.log(`Server running at http://${localIp}/`);
    console.log(`Information Desk: http://${localIp}/info_desk.html`);
    console.log(`TV Display:       http://${localIp}/tv_display.html`);
    console.log(`Example Counter:  http://${localIp}/counter_1.html`);
    console.log(`---------------------------------`);
    console.log(`Counter range: counter_1.html to counter_18.html`);
});
