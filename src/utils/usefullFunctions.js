export const checkInputs = (matris, finalMatris) => {
    let shouldContinue = true;
    const arr = [];
    const arr2 = [];
    //check if the input (matrix) is correct
    for (let i = 0; i < 3 && shouldContinue === true; i++) {
        for (let j = 0; j < 3; j++) {
            if (matris[i][j] < 0 || matris[i][j] > 8) {
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
    for (let i = 0; i < 3 && shouldContinue === true; i++) {
        for (let j = 0; j < 3; j++) {
            if (finalMatris[i][j] < 0 || finalMatris[i][j] > 8) {
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

export function isSolvable(matrix) {
    const flatMatrix = matrix.flat();
    const length = flatMatrix.length;
    let inversions = 0;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (flatMatrix[i] && flatMatrix[j] && flatMatrix[i] > flatMatrix[j]) {
                inversions++;
            }
        }
    }

    // If the grid size (N) is odd
    if (length % 2 !== 0) {
        return inversions % 2 === 0;
    }

    // If the grid size (N) is even
    const blankIndex = flatMatrix.indexOf(0);
    const blankRowFromBottom = Math.floor(blankIndex / N) + 1;

    // If the number of inversions is odd and the blank is on an even row from the bottom (counting from 1)
    // or if the number of inversions is even and the blank is on an odd row from the bottom (counting from 1)
    return (inversions % 2 !== 0 && blankRowFromBottom % 2 === 0) || (inversions % 2 === 0 && blankRowFromBottom % 2 !== 0);
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