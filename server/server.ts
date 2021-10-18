//This script handles the server side methods

import http = require('http');
import fs = require('fs');
import { BetData, BetResponse, Player } from "./player.js";

const port = process.env.port || 1337

CreateServer();//initializes the server on startup


//function that listens to server requests
function CreateServer() {

    http.createServer(function (req, res) {

        if (req.url.includes("/player")) {//handles the request type of getting player data

            res.write(GetPlayer());//sends playerdata back to the client
            res.end();
        }
        else if (req.url.includes("/task")) {//handles the request type of betting

            if (!CheckBet(ParseBet(req.url)))//checks bet and adds the response to the playerdata then sends it back to the client
                res.write("ERROR/Not Enough Money!");//sends a error resopnse to the client if the user dosen't have sufficent money for the bet
            else res.write(GetPlayer());

            res.end();
        }
        else {//handles file request types

            var file;

            if (req.url == '/') file = '/webpage/index.html';//sets the correct path for the main browser page
            else file = req.url;

            file = "." + file;//changes request to correct path

            fs.readFile(file, function (err, f) {//reads the file that needs to be loaded in the server

                if (ErrorHandle(file, err) == 0) {//checks if any errors where thrown
                    res.end();
                    return;
                }

                if (file.includes(".html")) { res.writeHead(200, { "Content-Type": "text/html" }); }//adds the index.html file

                res.write(f);//adds any other file: css,.ico,scripts,etc...

                res.end();//sends response back to client
            });
        }

    }).listen(port);//listens to the specified port

}

//method for checking the bet to a random result specified by the math model
function CheckBet(bet: BetData):boolean {

    if (bet.bet > p.money) return false;//if the player dosen't have enough money, he cannot bet

    var result = Math.floor(Math.random() * 15);//get a random number between 0 and 14

    //0-6 means a heads win; 7 is a no win; 8-14 is a tails win and 7 is a no win 
    if ((result < 7 && bet.CheckCoin("heads")) || (result > 7 && bet.CheckCoin("tails"))) {
        p.money += bet.bet * 2;//on win players doubles the bet
        p.bets.push(new BetResponse(bet.bet, bet.coin, 1));
    }
    else
    {
        if (result != 7) {
            p.money -= bet.bet;//on lose player loses the bet
            p.bets.push(new BetResponse(bet.bet, bet.coin, -1));
        }
        else p.bets.push(new BetResponse(bet.bet, bet.coin, 0));
    }

    return true;//player bet succesfully
}

//parses a bet from a request string
function ParseBet(input: string): BetData {

    //the expected string will be simmilar to /task/heads/0.1 where heads and 0.1 will change depending on what the user selects

    input = input.substring(1);
    input = input.substring(input.indexOf('/') + 1);

    var type = input.substring(0, 5);

    var bet = input.substring(input.indexOf('/') + 1);

    return new BetData(parseFloat(bet),type);
}

var p = CreatePlayer();

//creates an initial player for testing purposes
function CreatePlayer(): Player {

    var b = new BetResponse(2, "heads", 1);//sets a default past bet

    var ba = new Array<BetResponse>();

    ba.push(b);

    return new Player("John", 15, ba);//creates the user
}

//gets the JSON of the player class file
function GetPlayer(): string {

    return JSON.stringify(p);
}


//handles file reading errors
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

