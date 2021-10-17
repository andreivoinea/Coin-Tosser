import http = require('http');
import fs = require('fs');
import { BetData, BetResponse, Player } from "./player.js";

const port = process.env.port || 1337

fs.readFile('./webpage/index.html', function (err, html) {
    try {
        if (err) {
            throw err;
        }
    }
    catch (err) {
        console.log("Error while loading html");
        return;
    }

    http.createServer(function (req, res) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();

    }).listen(port);

});
