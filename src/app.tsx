import { Canvas } from "./components/canvas";
import { Grid } from "./mazes/grid";

export function App() {
    const grid = new Grid(20, 20);
    grid.binaryTree();

    return (
        <>
            <Canvas grid={grid} width={500} height={500}></Canvas>
        </>
    );
}
