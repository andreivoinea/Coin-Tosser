import http = require('http');
import fs = require('fs');
import { BetData, BetResponse, Player } from "./player.js";

const port = process.env.port || 1337

CreateServer();


function CreateServer() {

    http.createServer(function (req, res) {

        if (req.url.includes("/player")) {

            res.write(GetPlayer());
            res.end();
        }
        else if (req.url.includes("/task")) {

            if (!CheckBet(ParseBet(req.url)))
                res.write("ERROR/Not Enough Money!");
            else res.write(GetPlayer());

            res.end();
        }
        else {

            var file;

            if (req.url == '/') file = '/webpage/index.html';
            else file = req.url;

            file = "." + file;

            fs.readFile(file, function (err, f) {

                if (ErrorHandle(file, err) == 0) {
                    res.end();
                    return;
                }

                if (file.includes(".html")) { res.writeHead(200, { "Content-Type": "text/html" }); }

                res.write(f);

                res.end();
            });
        }

    }).listen(port);

}

function CheckBet(bet: BetData):boolean {

    if (bet.bet > p.money) return false;

    var result = Math.floor(Math.random() * 15);

    if ((result < 7 && bet.CheckCoin("heads")) || (result > 7 && bet.CheckCoin("tails"))) {
        p.money += bet.bet * 2;
        p.bets.push(new BetResponse(bet.bet, bet.coin, true));
    }
    else
    {
        p.money -= bet.bet;
        p.bets.push(new BetResponse(bet.bet, bet.coin, false));
    }

    return true;
}


function ParseBet(input: string): BetData {

    input = input.substring(1);
    input = input.substring(input.indexOf('/') + 1);

    var type = input.substring(0, 5);

    var bet = input.substring(input.indexOf('/') + 1);

    return new BetData(parseFloat(bet),type);
}

var p = CreatePlayer();

function CreatePlayer(): Player {

    var b = new BetResponse(2, "heads", true);

    var ba = new Array<BetResponse>();

    ba.push(b);

    return new Player("John", 15, ba);
}

function GetPlayer(): string {

    return JSON.stringify(p);
}


function ErrorHandle(file: string,err:any) : number {

    try {
        if (err) {
            throw err;
        }
    }
    catch (err) {
        console.log("Error while loading " + file);
        return 0;
    }

    return 1;

}

