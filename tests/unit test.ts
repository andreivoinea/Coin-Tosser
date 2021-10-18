//unit test that handles the statistics module
import 'jasmine';
import { BetData} from "../server/player.js";

describe('Statistics Module', function () {

    it('Test 10^6 bets on heads with the value of 10', () => {

        expect(TestBet(1000000,10,"heads")).toBe(true);
    });

    it('Test 10^6 bets on heads with the value of 5', () => {

        expect(TestBet(1000000, 5, "heads")).toBe(true);
    });

    it('Test 10^6 bets on heads with the value of 1', () => {

        expect(TestBet(1000000, 1, "heads")).toBe(true);
    });

    it('Test 10^6 bets on heads with the value of 13', () => {

        expect(TestBet(1000000, 13, "heads")).toBe(true);
    });

});

function TestBet(bet_number: number,bet_value:number, bet_type: string): boolean {

    if (bet_number <= 0) return false;
    if (bet_value <= 0) return false;
    if (bet_type != "heads" && bet_type != "tails") return false;

    var totalBet = bet_value * bet_number;
    var winCount = 0;
    var winSum = 0;

    for (var i = 0; i < bet_number; ++i) {

        var b = new BetData(bet_value, bet_type);
        var result = Math.floor(Math.random() * 15);

        if ((result < 7 && b.CheckCoin("heads")) || (result > 7 && b.CheckCoin("tails"))) {
            winSum += b.bet * 2;
            ++winCount;
        }

    }

    console.log("<--------------------------------------->");
    console.log("Statistics for betting on " + bet_type + ", with  " + bet_value + " coins, running for " + bet_number +" times");
    console.log("<--------------------------------------->");
    console.log("totalBet = " + totalBet);
    console.log("totalWin = " + winSum);
    console.log("hitRate = " + winCount / bet_number);
    console.log("averageWin = " + winSum / bet_number);
    console.log("averagePositiveWin = " + winSum / winCount);

    var standardDeviation = 0;
    standardDeviation += (bet_value * 2 - (winSum / bet_number)) * winCount;
    standardDeviation += (winSum / bet_number) * (bet_number - winCount);

    console.log("standardDeviationOfWin = " + (Math.sqrt(standardDeviation / bet_number)));
    console.log("<--------------------------------------->");

    return true;
}