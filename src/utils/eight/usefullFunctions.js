export const checkInputs = (matris, finalMatris) => {
    const n = matris.length;
    let shouldContinue = true;
    const arr = [];
    const arr2 = [];
    //check if the input (matrix) is correct
    for (let i = 0; i < n && shouldContinue === true; i++) {
        for (let j = 0; j < n; j++) {
            if (matris[i][j] < 0 || matris[i][j] > n * n - 1) {
                shouldContinue = false;
                break
            }
            if (arr.includes(matris[i][j])) {
                shouldContinue = false;
                break
            }
            arr.push(matris[i][j])
        }
    }
    //check if the input (finalMatrix) is correct
    for (let i = 0; i < n && shouldContinue === true; i++) {
        for (let j = 0; j < n; j++) {
            if (finalMatris[i][j] < 0 || finalMatris[i][j] > n * n - 1) {
                shouldContinue = false;
                break
            }
            if (arr2.includes(finalMatris[i][j])) {
                shouldContinue = false;
                break
            }
            arr2.push(finalMatris[i][j])
        }
    }
    return shouldContinue;
}

export function isSolvable(initialMatrix, finalMatrix) {
    const flatInitialMatrix = initialMatrix.flat();
    const flatFinalMatrix = finalMatrix.flat();
    const length = flatInitialMatrix.length;
    let initialInversions = 0;
    let finalInversions = 0;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (flatInitialMatrix[i] && flatInitialMatrix[j] && flatInitialMatrix[i] > flatInitialMatrix[j]) {
                initialInversions++;
            }
            if (flatFinalMatrix[i] && flatFinalMatrix[j] && flatFinalMatrix[i] > flatFinalMatrix[j]) {
                finalInversions++;
            }
        }
    }

    // If the grid size (N) is odd in both matrices
    if (length % 2 !== 0) {
        return (initialInversions % 2 === 0) === (finalInversions % 2 === 0);
    }

    // If the grid size (N) is even in both matrices
    const initialBlankIndex = flatInitialMatrix.indexOf(0);
    const finalBlankIndex = flatFinalMatrix.indexOf(0);
    const initialBlankRowFromBottom = Math.floor(initialBlankIndex / length) + 1;
    const finalBlankRowFromBottom = Math.floor(finalBlankIndex / length) + 1;

    // If the number of inversions is odd and the blank is on an even row from the bottom (counting from 1)
    // or if the number of inversions is even and the blank is on an odd row from the bottom (counting from 1)
    return (initialInversions % 2 !== 0 && initialBlankRowFromBottom % 2 === 0) === (finalInversions % 2 !== 0 && finalBlankRowFromBottom % 2 === 0);
}


export const highestNodesInLevel = root => {
    let maxNumber = 0;

    if (!root) {
        return 0;
    }

    const queue = [root];

    while (queue.length > 0) {
        const currentLevelNodes = [];
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevelNodes.push(currentNode);

            // Add children of the current node to the queue
            currentNode.children.forEach(child => {
                queue.push(child);
            });
        }

        maxNumber = maxNumber > currentLevelNodes.length ? maxNumber : currentLevelNodes.length;
    }

    return maxNumber;
}

export const hightOfTree = node => {
    if (node.children.length === 0) {
        return 1;
    }

    let maxHeight = 0;

    for (const child of node.children) {
        const height = hightOfTree(child);
        maxHeight = Math.max(maxHeight, height);
    }

    return maxHeight + 1;
}