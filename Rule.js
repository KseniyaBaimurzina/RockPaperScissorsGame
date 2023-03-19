import _ from "underscore";
const Rule = class {

    constructor(allowedMoves) {
        this.allowedMoves = allowedMoves;
        this.ValidateRules();
        this.rules = this.MakeRules()
    }

    IsOdd(moves) {
        if (moves.length % 2 == 0) {
            console.log("The number of moves is INCORRECT\n" +
                "Please try again and make sure if the number of moves is ODD (e.g 3, 5, 7...)!");
            process.exit();
        }
    }

    IsUnique(moves) {
        if (moves.length != _.uniq(moves).length) {
            console.log("There are identical moves \n" +
                "Please try again and make sure if all the moves are unique and not repeated!");
            process.exit();
        }
    }

    IsExcessTwo(moves) {
        if (this.allowedMoves.length <= 2) {
            console.log("The number of moves is INCORRECT\n" +
                "Please try again and make sure if the number of moves is in excess of 2 (e.g 3, 5, 7...)");
            process.exit();
        }
    }


    ValidateRules() {
        this.IsExcessTwo(this.allowedMoves);
        this.IsOdd(this.allowedMoves);
        this.IsUnique(this.allowedMoves);
    }

    MakeRules() {
        var movesAmount = this.allowedMoves.length,
            halfMoves = (movesAmount - 1) / 2,
            rules = new Object(),
            loseMoves = [];
        for (let moveIndex = 0; moveIndex < movesAmount; moveIndex++) {
            var firstMember = (moveIndex + 1) % movesAmount,
                lastMember = (moveIndex + halfMoves) % movesAmount;
            if (firstMember <= lastMember) {
                loseMoves = Array.from({ length: halfMoves }, (_, index) => this.allowedMoves[index + firstMember]);
            } else {
                loseMoves = Array.from({ length: movesAmount - moveIndex - 1 }, (_, index) => this.allowedMoves[index + moveIndex + 1]);
                loseMoves.push(...Array.from({ length: halfMoves - loseMoves.length }, (_, index) => this.allowedMoves[index]));
            }
            rules[this.allowedMoves[moveIndex]] = loseMoves;
        }
        return rules;
    }

    GetResult(playerMove, computerMove) {
        // var rule = this.MakeRules();
        var result = (this.rules[playerMove].includes(computerMove)) ? "Win" : (playerMove == computerMove) ? "Draw" : "Lose";
        return result;
    }
}

export default Rule;