import { FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Grid } from "../mazes/grid";

export interface CanvasProps {
    grid: Grid;
    width: number;
    height: number;
    style?: {
        lineWidth?: number;
        lineColor?: string;
    };
}

export const Canvas: FunctionComponent<CanvasProps> = ({
    grid,
    width,
    height,
    style,
}) => {
    const lineStyle = {
        width: style?.lineWidth ?? 10,
        color: style?.lineColor ?? "#000",
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);

    function draw(ctx: CanvasRenderingContext2D) {
        console.log(grid.toString());

        ctx.clearRect(0, 0, width, height);
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "#fff";
        ctx.fill();

        const lineWidth = Math.floor(lineStyle.width);
        const offset = Math.floor(lineWidth / 2);
        const cellWidth = Math.floor(width / grid.cols - lineWidth);
        const cellHeight = Math.floor(height / grid.rows - lineWidth);
        const origX = (width - cellWidth * grid.cols) / 2;
        const origY = (height - cellHeight * grid.rows) / 2;

        let x = origX;
        let y = origY;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineStyle.color;

        ctx.beginPath();
        ctx.moveTo(x - offset, y);
        ctx.lineTo(cellWidth * grid.cols + offset * grid.cols, y);
        ctx.stroke();

        for (const row of grid.eachRow()) {
            x = origX;
            ctx.beginPath();
            ctx.moveTo(x, y);
            y += cellHeight;
            ctx.lineTo(x, y + offset);
            ctx.stroke();

            for (const cell of row) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (!cell.linked(cell.south)) {
                    ctx.strokeStyle = "black";
                    ctx.lineTo(x + cellWidth + offset, y);
                    ctx.stroke();
                } else {
                    ctx.moveTo(x + offset, y);
                    ctx.strokeStyle = grid.colorOf(cell);
                    ctx.lineTo(x + cellWidth + offset, y);
                    ctx.stroke();
                }

                x += cellWidth;
                ctx.beginPath();
                ctx.moveTo(x, y);

                if (!cell.linked(cell.east)) {
                    ctx.strokeStyle = "black";
                    ctx.lineTo(x, y - cellHeight - offset);
                    ctx.stroke();
                } else {
                    ctx.moveTo(x, y - offset);
                    ctx.strokeStyle = grid.colorOf(cell);
                    ctx.lineTo(x, y - cellHeight + offset);
                    ctx.stroke();
                }

                ctx.fillStyle = "black";
                ctx.font = "30px Helvetica Neue";
                ctx.fillText(
                    grid.contentsOf(cell),
                    x - cellWidth / 1.75,
                    y - cellHeight / 2.5
                );

                ctx.fillStyle = grid.colorOf(cell);
                ctx.fillRect(
                    x - cellWidth + offset,
                    y - cellHeight + offset,
                    cellWidth - lineWidth,
                    cellHeight - lineWidth
                );
                ctx.stroke();
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
