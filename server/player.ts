//This script is a container for class types

//BetData represents data of a non-verified bet (sent by the player)
export class BetData {

    bet: number;
    coin: string;

    CheckCoin(input: string): boolean {
        return input === this.coin;
    }

    constructor(bet_value: number, bet_type: string) {
        this.bet = bet_value;
        this.coin = bet_type;
    }
}

//BetResponse represents data of a verified bet (sent by the server)
export class BetResponse {
    data: BetData;
    result: number;

    constructor(bet_value: number, bet_type: string, bet_result: number) {
        this.data = new BetData(bet_value, bet_type);
        this.result = bet_result;
    }

}

//Player class holds all player information including all bets he did in the past
export class Player {
    name: string;
    money: number;
    bets: Array<BetResponse>;

    constructor(name: string, money: number, betList: Array<BetResponse>) {
        this.name = name;
        this.money = money;
        this.bets = betList;
    }
}