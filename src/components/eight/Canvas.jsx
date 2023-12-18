import { useRef, useEffect } from 'react';


const drawLine = (cx, ox, oy, tx, ty) => {
    cx.moveTo(ox, oy);
    cx.lineTo(tx, ty);
    cx.stroke();
}

// width: the width of the canvas
// prevW: which node in the origin of the line
// currW: which node in the terminal of the line
// h: the level of the origin node
// prevRowLength: number of the nodes in the last level
// currRowLength: number of the nodes in the current level
const drawLineInGraph = (cx, width, prevW, currW, h, prevRowLength, currRowLength, N) => {
    let ox, oy, tx, ty;

    ty = h * (N * 50 + 120)
    oy = ty - 71;

    ox = ((width - prevRowLength * (50 * N)) / (prevRowLength + 1)) * prevW + prevW * (50 * N) - (25 * N)

    tx = ((width - currRowLength * (50 * N)) / (currRowLength + 1)) * currW + currW * (50 * N) - (25 * N)

    drawLine(cx, ox, oy, tx, ty)
}

export default function Canvas({ height, width, arr, N }) {

    const canvasRef = useRef()
    useEffect(() => {
        const canvas = canvasRef.current;
        const cx = canvas.getContext('2d');
        cx.strokeStyle = "red";
        cx.fill();

        const rows = arr;

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].arr.length; j++) {
                drawLineInGraph(cx, width, rows[i].arr[j], j + 1, i + 1, rows[i].prevRowLength, rows[i].arr.length, N);
            }
        }

    }, []);
    return (
        <canvas ref={canvasRef} width={width + 'px'} height={height + 'px'} style={{ position: 'absolute' }}>Canvas</canvas>
    )
}
