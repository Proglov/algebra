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
const drawLineInGraph = (cx, width, prevW, currW, h, prevRowLength, currRowLength) => {
    let ox, oy, tx, ty;

    ty = h * 100
    oy = ty - 26;

    ox = ((width - prevRowLength * 50) / (prevRowLength + 1)) * prevW + prevW * 50 - (25)

    tx = ((width - currRowLength * 50) / (currRowLength + 1)) * currW + currW * 50 - (25)

    drawLine(cx, ox, oy, tx, ty)
}

export default function Canvas({ height, width, arr }) {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current;
        const cx = canvas.getContext('2d');
        cx.strokeStyle = "red";
        cx.fill();

        const rows = arr;

        for (let i = 1; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                if (!!rows[i][j])
                    drawLineInGraph(cx, width, parseInt(j / 2) + 1, j + 1, i, rows[i].length / 2, rows[i].length);
            }
        }

    }, []);
    return (
        <canvas ref={canvasRef} width={width + 'px'} height={height + 'px'} style={{ position: 'absolute' }}>Canvas</canvas>
    )
}
