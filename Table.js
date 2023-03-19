import { Table } from "console-table-printer";

const RuleTable = class {
    constructor(rule) {
        this.rule = rule;
        this.tableData = this.MakeTable();
    }

    MakeTableRow(rowName) {
        var tableRow = { move: rowName };
        for (let move in this.rule.allowedMoves) {
            tableRow[this.rule.allowedMoves[move]] = this.rule.GetResult(rowName, this.rule.allowedMoves[move])
        }
        return tableRow;
    }

    MakeTable() {
        var colsAlign = [{ name: "move", alignment: "left" }];
        for (let colName of this.rule.allowedMoves) {
            colsAlign.push({ name: colName, alignment: "left" });
        }
        this.table = new Table({
            columns: colsAlign
        });
        for (let key of this.rule.allowedMoves) {
            this.table.addRow(this.MakeTableRow(key));
        }
    }

    PrintTable() {
        this.table.printTable();
    }

}

export default RuleTable;