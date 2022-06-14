import { Cell } from "./cell";

export class CellDistanceTracker {
    #root: Cell;
    #distances: Map<Cell, number>;

    constructor(root: Cell) {
        this.#root = root;
        this.#distances = new Map();
        this.set(this.#root, 0);
    }

    public get(cell: Cell): number | undefined {
        return this.#distances.get(cell);
    }

    public set(cell: Cell, distance: number): void {
        this.#distances.set(cell, distance);
    }

    public cells(): Cell[] {
        return [...this.#distances.keys()];
    }
}
