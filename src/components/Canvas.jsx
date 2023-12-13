import { useRef, useEffect } from 'react';

const convertTreeToUI = root => {
    const result = [];
    const sizes = [];

    if (!root) {
        return result;
    }

    const queue = [root];

    while (queue.length > 0) {
        const currentLevelNodes = [];
        const levelSize = queue.length;
        sizes.push(levelSize)
        const obj = {
            prevRowLength: 0,
            arr: currentLevelNodes
        }

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();

            currentNode.children.forEach(_child => {
                currentLevelNodes.push(i + 1);
            });

            // Add children of the current node to the queue
            currentNode.children.forEach(child => {
                queue.push(child);
            });
        }

        result.push(obj);
    }

    result.pop();
    sizes.pop();

    for (let i = 0; i < result.length; i++) {
        result[i].prevRowLength = sizes[i]
    }

    return result;
};

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

    ox = (prevW - 0.5) * (width / prevRowLength)
    tx = (currW - 0.5) * (width / currRowLength)

    ty = h * 272 - 5;
    oy = ty - 71;

    console.log(tx)
    console.log(currRowLength)
    console.log(width)
    console.log(currW)
    console.log('\n\n')

    drawLine(cx, ox, oy, tx, ty)
}

export default function Canvas({ height, width, rootNode }) {

    const canvasRef = useRef()
    useEffect(() => {
        const canvas = canvasRef.current;
        const cx = canvas.getContext('2d');
        cx.strokeStyle = "red";
        cx.fill();

        const rows = convertTreeToUI(rootNode);

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].arr.length; j++) {
                drawLineInGraph(cx, width, rows[i].arr[j], j + 1, i + 1, rows[i].prevRowLength, rows[i].arr.length);
            }
        }

    }, []);
    return (
        <canvas ref={canvasRef} width={width + 'px'} height={height + 'px'} style={{ position: 'absolute' }}>Canvas</canvas>
    )
}
