const express = require('express');
const helmet = require("helmet");
const net = require('net');

const app = express();
app.use(helmet());

const PORT = process.env.PORT || 20000;

app.get("/", (req, res) => {
    const sock = new net.Socket();
    sock.setTimeout(2500);
    sock.on('connect', function() {
        res.send("teamspeak is up");
        sock.destroy();
    }).on('error', function(e) {
        res.sendStatus(503);
        sock.destroy();
    }).on('timeout', function(e) {
        res.sendStatus(503);
        sock.destroy();
    }).connect(10011, "localhost");
});

app.listen(PORT);