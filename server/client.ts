//This script handles the client side methods
import { Player } from "./player.js";

//variables that hold specific element items
var heads;
var tails;
var bet;
var error;

GetVars();//initializes the variables on start

//tries to fill the elements from the document and handles player data
function GetVars() {
    heads = <HTMLInputElement>document.getElementById("heads");
    tails = <HTMLInputElement>document.getElementById("tails");
    bet = <HTMLInputElement>document.getElementById("bet");
    error = document.getElementById("ERROR");
    server("player");//requests the player data
}

//async function for loading the player data
async function GetPlayerData() {

    while (document.body == null) {//waits for the page to load

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    var old = document.getElementById("player");//remember if a player element is already created

    //creates a new player element
    var player = document.createElement("div");
    player.id = "player";

    while (playerData == null) {//waits for the playerData from the server side
        console.log("awaiting");

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    //creates specific element containers
    var c = document.createElement("div");
    c.innerHTML = "Player Name: " + playerData.name;
    player.append(c);

    c = document.createElement("div");
    c.innerHTML = "Player Money: " + playerData.money;
    player.append(c);

    if (playerData.bets.length > 0) {//creates a list for all the past bets

        var l = document.createElement("ol");

        playerData.bets.forEach(bet => {
            var li = document.createElement("li");
            li.innerHTML = bet.data.coin + " " + bet.data.bet + " " + ParseResult(bet.result);
            l.appendChild(li);
        });

        player.appendChild(l);
    }

    if (typeof old !== "undefined" && old != null) old.parentNode.removeChild(old);//if player element already exists, remove it before appending the new one

    document.body.appendChild(player);
}

//parses a result string from a bet result
function ParseResult(result:boolean):string {
    if (result) return "Won!";
    return "Lost";
}

//handles toggle button for bet type selection
function switchButton(button: string) {

    if (heads == null) GetVars();

    switch (button) {
        case "heads":
            heads.disabled = true;
            tails.disabled = false;
            break;
        case "tails":
            heads.disabled = false;
            tails.disabled = true;
            break;
        default:
            break;
            
    }

}

//sends the current bet request to the server side
function sendBet() {

    if (heads == null) GetVars();

    if (!bet.validity.valid) return;

    var req = "task/";

    if (heads.disabled) req += "heads/";
    else req += "tails/";

    req += bet.value.toString();

    server(req);
}

var playerData = null;//holds player variable

//sends 'GET' request to the server side for handling
function server(request:string) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = this.responseText;
        }

        if (data.includes("ERROR"))//handles an error response
        {
            while (error == null)//waits for the error element
            {
                GetVars();
                await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
            }
            error.innerHTML = data.substring(data.indexOf('/')+1);//sets the error element text to the error message
        }
        else
        {
            if(error!=null)
            error.innerHTML = "";//empties the error element on good response

            playerData = JSON.parse(data) as Player;//tries to parse the json data received as a Player class
            if (typeof playerData !== "undefined" && playerData != null) GetPlayerData();//if a player was loaded, reload the UI
        }

    };

    xhr.open('GET', request, true);
    xhr.send();

}




