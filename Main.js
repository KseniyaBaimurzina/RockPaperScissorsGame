import _ from "underscore";
import promptSync from 'prompt-sync';
import KeyGenerator from "./KeyGenerator.js";
import Rule from "./Rule.js";
import RuleTable from "./Table.js";

const Game = class {
    constructor() {
        this.rule = new Rule(process.argv.slice(2));
        this.table = new RuleTable(this.rule);
        this.keyGenerator = new KeyGenerator();
        this.StartGame();
    }

    MakeMove() {
        var compMove = _.sample(this.rule.allowedMoves);
        console.log("HMAC:" + this.keyGenerator.MakeHMAC(compMove));
        return compMove;
    }

    StartGame() {
        var compMove = this.MakeMove();
        this.PrintMenu();
        var chosenOpt = this.GetPlayerCommand();
        if (chosenOpt) {
            console.log("Your move: " + chosenOpt + "\n" +
                "Computer move: " + compMove + "\n" +
                "You " + this.rule.GetResult(chosenOpt, compMove) + "\n" +
                "HMAC key: " + this.keyGenerator.key);
        }
    }

    PrintMenu() {
        console.log("Available moves:")
        for (let index = 1; index <= this.rule.allowedMoves.length; index++)
            console.log(index + " - " + this.rule.allowedMoves[index - 1]);
        console.log("0 - exit\n? - help");
    }


    GetPlayerCommand() {
        var prompt = promptSync();
        var choose = prompt('Enter your move: ');
        switch (true) {
            case (choose == "0"):
                process.exit();
            case (choose == "?"):
                this.table.PrintTable();
                return this.GetPlayerCommand();
            case Array.from({ length: this.rule.allowedMoves.length + 1 }, (_, i) => i.toString()).includes(choose):
                choose = this.rule.allowedMoves[parseInt(choose) - 1];
                return choose;
            default:
                this.PrintMenu();
                return this.GetPlayerCommand();
        }
    }
}

let game = new Game()