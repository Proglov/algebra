import { useState, useEffect, useRef } from 'react'
import Matrix from './Matrix';

// Bottom, left, top, right
const rowMove = [1, 0, -1, 0];
const colMove = [0, -1, 0, 1];

export default function MovingMatrix({ root, moves }) {
    const [matrix, setMatrix] = useState(root);
    const zeroX = useRef(0);
    const zeroY = useRef(0);

    const moveMatrix = (move) => {
        const newX = zeroX.current + rowMove[move];
        const newY = zeroY.current + colMove[move];
        const movedNumber = matrix[newX][newY];
        const newMatrix = [...matrix];
        newMatrix[zeroX.current][zeroY.current] = movedNumber;
        newMatrix[newX][newY] = 0;
        setMatrix(newMatrix)
        zeroX.current = newX;
        zeroY.current = newY;
    }

    useEffect(() => {
        setMatrix(root);
    }, [root]);

    useEffect(() => {
        const N = matrix.length;

        //where is zero located
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (matrix[i][j] === 0) {
                    zeroX.current = i;
                    zeroY.current = j;
                    break
                }
            }
        }

        let i = moves.length - 1;
        const interv = setInterval(() => {
            if (i === -1) clearInterval(interv)
            else {
                moveMatrix(moves[i]);
                i--;
            }
        }, 1500);

        return () => clearInterval(interv);
    }, [])


    return (
        <Matrix matrix={matrix} />
    )
}
// 2 4 3 1 6 8 7 0 5
