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

export class BetResponse {
    data: BetData;
    result: boolean;

    constructor(bet_value: number, bet_type: string, bet_result: boolean) {
        this.data = new BetData(bet_value, bet_type);
        this.result = bet_result;
    }

}

export class Player {
    name: string;
    money: number;
    bets: Array<BetResponse>;

    AddBet(bet: BetResponse, modify: boolean) {
        this.bets.concat(this.bets, bet);
        if (modify) this.ChangeMoney(bet.data.bet);
    }

    ChangeMoney(value: number) {
        this.money += value;
    }

    constructor(name: string, money: number, betList: Array<BetResponse>) {
        this.name = name;
        this.money = money;
        this.bets = betList;
    }
}