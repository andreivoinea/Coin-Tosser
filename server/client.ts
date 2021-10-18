import { Player } from "./player.js";

var heads;
var tails;
var bet;
var error;

GetVars();

function GetVars() {
    heads = <HTMLInputElement>document.getElementById("heads");
    tails = <HTMLInputElement>document.getElementById("tails");
    bet = <HTMLInputElement>document.getElementById("bet");
    error = document.getElementById("ERROR");
    server("player");
}

async function GetPlayerData() {

    while (document.body == null) {

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    var old = document.getElementById("player");

    var player = document.createElement("div");
    player.id = "player";

    while (playerData == null) {
        console.log("awaiting");

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    var c = document.createElement("div");
    c.innerHTML = "Player Name: " + playerData.name;
    player.append(c);

    c = document.createElement("div");
    c.innerHTML = "Player Money: " + playerData.money;
    player.append(c);

    if (playerData.bets.length > 0) {

        var l = document.createElement("ol");

        playerData.bets.forEach(bet => {
            var li = document.createElement("li");
            li.innerHTML = bet.data.coin + " " + bet.data.bet + " " + ParseResult(bet.result);
            l.appendChild(li);
        });

        player.appendChild(l);
    }

    if (typeof old !== "undefined" && old != null) old.parentNode.removeChild(old);

    document.body.appendChild(player);
}

function ParseResult(result:boolean):string {
    if (result) return "Won!";
    return "Lost";
}


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

function sendBet() {

    if (heads == null) GetVars();

    if (!bet.validity.valid) return;

    var req = "task/";

    if (heads.disabled) req += "heads/";
    else req += "tails/";

    req += bet.value.toString();

    server(req);
}

var playerData = null;

function server(request:string) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = this.responseText;

            // we get the returned data
        }

        if (data.includes("ERROR"))
        {
            while (error == null)
            {
                GetVars();
                await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
            }
            error.innerHTML = data.substring(data.indexOf('/')+1);
        }
        else
        {
            if(error!=null)
            error.innerHTML = "";

            playerData = JSON.parse(data) as Player;
            if (typeof playerData !== "undefined" && playerData != null) GetPlayerData();
        }

        // end of state change: it can be after some time (async)
    };

    xhr.open('GET', request, true);
    xhr.send();

}




