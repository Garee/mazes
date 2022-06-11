import { FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Grid } from "../mazes/grid";

export interface CanvasProps {
    grid: Grid;
    width: number;
    height: number;
}

export const Canvas: FunctionComponent<CanvasProps> = ({
    grid,
    width,
    height,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function draw(ctx: CanvasRenderingContext2D) {
        console.log(grid.toString());

        ctx.clearRect(0, 0, width, height);
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "#fff";
        ctx.fill();

        const lineWidth = 4;
        const cellWidth = width / grid.cols - lineWidth;
        const cellHeight = height / grid.rows - lineWidth;
        const origX = (width - cellWidth * grid.cols) / 2;
        const origY = (height - cellHeight * grid.rows) / 2;

        let x = origX;
        let y = origY;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#000";

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cellWidth * grid.cols, y);
        ctx.stroke();

        for (const row of grid.eachRow()) {
            x = origX;
            ctx.beginPath();
            ctx.moveTo(x, y);
            y += cellHeight;
            ctx.lineTo(x, y);
            ctx.stroke();

            for (const cell of row) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (!cell.linked(cell.south)) {
                    ctx.lineTo(x + cellWidth, y);
                    ctx.stroke();
                }

                x += cellWidth;
                ctx.beginPath();
                ctx.moveTo(x, y);

                if (!cell.linked(cell.east)) {
                    ctx.lineTo(x, y - cellHeight);
                    ctx.stroke();
                }
            }
        }
    }

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx && draw(ctx);
        }
    }, [draw]);

    return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};
