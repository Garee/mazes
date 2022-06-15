import { Canvas } from "./components/canvas";
import { ColorGrid } from "./mazes/color-grid";

export function App() {
    //const grid = new Grid(5, 5);
    const grid = new ColorGrid(25, 25);
    grid.binaryTree();

    const start = grid.get(
        Math.floor(grid.rows / 2),
        Math.floor(grid.cols / 2)
    );
    if (start) {
        grid.distances = start.distances();
        /*const [newStart] = grid.max();
        if (newStart) {
            grid.distances = newStart.distances();
            const [goal] = grid.max();
            if (goal) {
                grid.distances = newStart.pathTo(goal);
            }
        }*/
    }

    /*const end = grid.get(grid.rows - 1, 0);
    if (end) {
        grid.distances = start?.pathTo(end);
    }*/

    return (
        <>
            <Canvas
                grid={grid}
                width={500}
                height={500}
                style={{ lineWidth: 2 }}
            ></Canvas>
        </>
    );
}
