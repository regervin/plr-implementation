const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  if (req.url === '/' || req.url === '/index.html') {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Node Server Test</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: #e8f4fd;
        }
        .status { 
            background: #d4edda; 
            padding: 15px; 
            border-radius: 5px; 
            border: 1px solid #c3e6cb;
        }
    </style>
</head>
<body>
    <div class="status">
        <h1>✅ Node.js Server is Working!</h1>
        <p>Server started at: ${new Date().toISOString()}</p>
        <p>Request URL: ${req.url}</p>
        <p>User Agent: ${req.headers['user-agent']}</p>
    </div>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access at: http://localhost:${PORT}`);
});
