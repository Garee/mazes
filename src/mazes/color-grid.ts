import { Cell } from "./cell";
import { DistanceGrid } from "./distance-grid";

export class ColorGrid extends DistanceGrid {
    public contentsOf(_cell: Cell): string {
        return " ";
    }

    public colorOf(cell: Cell): string {
        let r = 0;
        let g = 255;
        let b = 0;
        const a = 255;

        const distance = this.distances?.get(cell);
        if (distance === undefined) {
            return super.colorOf(cell);
        }

        const [_, maximumDistance] = this.max();
        const intensity = (maximumDistance - distance) / maximumDistance;

        r = Math.round(255 * intensity);
        g = Math.round(128 + 127 * intensity);
        b = r;

        return `rgba(${r},${g},${b},${a})`;
    }
}
