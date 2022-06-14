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

    public max(): [Cell | undefined, number] {
        let maxDistance = 0;
        let maxCell = this.get(0, 0);

        for (const cell of this.eachCell()) {
            const distance = this.distances?.get(cell);
            if (distance !== undefined && distance > maxDistance) {
                maxDistance = distance;
                maxCell = cell;
            }
        }

        return [maxCell, maxDistance];
    }
}
