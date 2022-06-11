import { Canvas } from "./components/canvas";
import { Grid } from "./mazes/grid";

export function App() {
    const grid = new Grid(4, 4);
    grid.binaryTree();

    return (
        <>
            <Canvas grid={grid} width={500} height={500}></Canvas>
        </>
    );
}
