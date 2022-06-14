import { Canvas } from "./components/canvas";
import { DistanceGrid } from "./mazes/distance-grid";

export function App() {
    //const grid = new Grid(5, 5);
    const grid = new DistanceGrid(5, 5);
    grid.binaryTree();

    const start = grid.get(0, 0);
    if (start) {
        grid.distances = start.distances();
    }

    const end = grid.get(grid.rows - 1, 0);
    if (end) {
        grid.distances = start?.pathTo(end);
    }

    return (
        <>
            <Canvas grid={grid} width={500} height={500}></Canvas>
        </>
    );
}
