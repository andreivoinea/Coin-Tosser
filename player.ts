export class BetData {

    bet: number;
    coin: CoinSelection;

    SetCoin(input: string): void {

        switch (input.toLowerCase()) {
            case "heads":
                this.coin = CoinSelection.Heads;
                break;
            case "tails":
                this.coin = CoinSelection.Tails;
                break;
            default:
                this.coin = CoinSelection.Heads;
                break;
        }
    }

    SetBet(input: number): void {
        this.bet = input;
    }

    constructor(bet_value: number, bet_type: string) {
        this.SetBet(bet_value);
        this.SetCoin(bet_type);
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

enum CoinSelection { Heads, Tails};