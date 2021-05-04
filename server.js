const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 5000;

const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState ===WebSocket.OPEN) {
                client.send(data);
                console.log(data);
            }
        })
    })
});

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})