import { Cell } from "./cell";
import { CellDistanceTracker } from "./cell-distance-tracker";
import { Grid } from "./grid";

export class DistanceGrid extends Grid {
    #distances?: CellDistanceTracker;

    get distances(): CellDistanceTracker | undefined {
        return this.#distances;
    }

    set distances(distances: CellDistanceTracker | undefined) {
        this.#distances = distances;
    }

    public contentsOf(cell: Cell): string {
        const distance = this.#distances?.get(cell);
        if (distance !== undefined) {
            return `${distance}`;
        }

        return super.contentsOf(cell);
    }
}
