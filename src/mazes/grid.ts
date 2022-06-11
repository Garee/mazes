import { Cell } from "./cell";
import { randInt, sample } from "./util";

export class Grid {
    #rows: number;
    #cols: number;
    #grid: Cell[][];

    constructor(rows: number, cols: number) {
        this.#rows = rows;
        this.#cols = cols;

        this.#grid = new Array(this.#rows);
        for (let r = 0; r < this.#rows; r++) {
            this.#grid[r] = new Array(this.#cols);
        }

        this.populateGrid();
    }

    public get(row: number, col: number): Cell | undefined {
        if (row < 0 || row > this.#rows - 1) {
            return undefined;
        }

        if (col < 0 || col > this.#cols - 1) {
            return undefined;
        }

        return this.#grid[row][col];
    }

    public set(cell: Cell, row: number, col: number): void {
        if (row < 0 || row > this.#rows - 1) {
            return;
        }

        if (col < 0 || col > this.#cols - 1) {
            return;
        }

        this.#grid[row][col] = cell;
    }

    public rand(): Cell {
        const r = randInt(0, this.#rows - 1);
        const c = randInt(0, this.#cols - 1);
        return this.get(r, c) as Cell;
    }

    public size(): number {
        return this.#rows * this.#cols;
    }

    public *eachRow() {
        for (let r = 0; r < this.#rows; r++) {
            yield this.#grid[r];
        }
    }

    public *eachCell() {
        for (let r = 0; r < this.#rows; r++) {
            for (let c = 0; c < this.#cols; c++) {
                yield this.#grid[r][c];
            }
        }
    }

    public toString() {
        let s = "+" + "---+".repeat(this.#cols) + "\n";
        for (const row of this.eachRow()) {
            let top = "|";
            let bottom = "+";

            for (const cell of row) {
                const east = cell.linked(cell.east) ? " " : "|";
                const south = cell.linked(cell.south) ? "   " : "---";
                top += "   " + east;
                bottom += south + "+";
            }

            s += top + "\n";
            s += bottom + "\n";
        }
        return s;
    }

    public binaryTree(): void {
        for (const cell of this.eachCell()) {
            const neighbours = [cell.north, cell.east].filter((n) => !!n);
            const neighbour = sample(neighbours);
            if (neighbour) {
                cell.link(neighbour);
            }
        }
    }

    public sideWinder(): void {
        for (const row of this.eachRow()) {
            row.forEach((cell) => {
                let run = [cell];
                const shouldClose =
                    !cell.east || (cell.north && randInt(0, 1) === 0);
                if (shouldClose) {
                    const member = sample(run);
                    if (member.north) {
                        member.link(member.north);
                    }
                    run = [];
                } else if (cell.east) {
                    cell.link(cell.east);
                }
            });
        }
    }

    public reset(): void {
        this.populateGrid();
    }

    private populateGrid(): void {
        for (let r = 0; r < this.#rows; r++) {
            for (let c = 0; c < this.#cols; c++) {
                this.set(new Cell(r, c), r, c);
            }
        }

        this.assignNeighbours();
    }

    private assignNeighbours(): void {
        for (const cell of this.eachCell()) {
            const r = cell.row();
            const c = cell.col();
            cell.north = this.get(r - 1, c);
            cell.south = this.get(r + 1, c);
            cell.east = this.get(r, c + 1);
            cell.west = this.get(r, c - 1);
        }
    }
}
