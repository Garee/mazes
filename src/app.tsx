import { Canvas } from "./components/canvas";
import { DistanceGrid } from "./mazes/distance-grid";

export function App() {
    //const grid = new Grid(5, 5);
    const grid = new DistanceGrid(5, 5);
    grid.binaryTree();

    const start = grid.get(0, 0);
    if (start) {
        grid.distances = start.distances();
        const [newStart] = grid.max();
        if (newStart) {
            grid.distances = newStart.distances();
            const [goal] = grid.max();
            if (goal) {
                grid.distances = newStart.pathTo(goal);
            }
        }
    }

    /*const end = grid.get(grid.rows - 1, 0);
    if (end) {
        grid.distances = start?.pathTo(end);
    }*/

    return (
        <>
            <Canvas grid={grid} width={500} height={500}></Canvas>
        </>
    );
}
