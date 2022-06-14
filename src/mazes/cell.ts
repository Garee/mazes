import { CellDistanceTracker } from "./cell-distance-tracker";

export class Cell {
    #row: number;
    #col: number;
    #links: Map<Cell, boolean>;
    #north?: Cell;
    #south?: Cell;
    #east?: Cell;
    #west?: Cell;

    constructor(row: number, col: number) {
        this.#row = row;
        this.#col = col;
        this.#links = new Map();
    }

    public row(): number {
        return this.#row;
    }

    public col(): number {
        return this.#col;
    }

    get north(): Cell | undefined {
        return this.#north;
    }

    set north(cell: Cell | undefined) {
        this.#north = cell;
    }

    get south(): Cell | undefined {
        return this.#south;
    }

    set south(cell: Cell | undefined) {
        this.#south = cell;
    }

    get east(): Cell | undefined {
        return this.#east;
    }

    set east(cell: Cell | undefined) {
        this.#east = cell;
    }

    get west(): Cell | undefined {
        return this.#west;
    }

    set west(cell: Cell | undefined) {
        this.#west = cell;
    }

    public links(): Cell[] {
        return [...this.#links.keys()];
    }

    public link(cell: Cell, opt = { bidi: true }): void {
        this.#links.set(cell, true);

        if (opt.bidi) {
            cell.link(this, { bidi: false });
        }
    }

    public unlink(cell: Cell, opt = { bidi: true }): void {
        this.#links.delete(cell);

        if (opt.bidi) {
            cell.unlink(this, { bidi: false });
        }
    }

    public linked(cell?: Cell): boolean {
        return !!cell && this.#links.has(cell);
    }

    public distances(): CellDistanceTracker {
        const distances = new CellDistanceTracker(this);

        let frontier: Cell[] = [this];
        while (frontier.length > 0) {
            const nextFrontier: Cell[] = [];
            for (const cell of frontier) {
                const cellDistance = distances.get(cell);
                for (const link of cell.links()) {
                    const linkDistance = distances.get(link);
                    if (
                        linkDistance === undefined &&
                        cellDistance !== undefined
                    ) {
                        distances.set(link, cellDistance + 1);
                        nextFrontier.push(link);
                    }
                }
            }

            frontier = nextFrontier;
        }

        return distances;
    }

    public pathTo(goal: Cell): CellDistanceTracker {
        const distances = this.distances();
        const breadcrumbs = new CellDistanceTracker(this);

        const goalDistance = distances.get(goal);
        if (goalDistance) {
            breadcrumbs.set(goal, goalDistance);
        }

        let current = goal;
        while (current !== this) {
            for (const link of current.links()) {
                const currentDistance = distances.get(current);
                const linkDistance = distances.get(link);
                if (
                    linkDistance !== undefined &&
                    currentDistance !== undefined &&
                    linkDistance < currentDistance
                ) {
                    breadcrumbs.set(link, currentDistance - 1);
                    current = link;
                    break;
                }
            }
        }

        return breadcrumbs;
    }
}
