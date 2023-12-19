export const customSort = array => array.sort((a, b) => {
    return a.value - b.value;
});

// convert the tree into an array of arrays of nodes
export const convertTreeToArray = root => {
    const result = [];
    const canvasResult = [];
    const sizes = [];

    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes = [];
        const currentLevelNodesIndex = [];
        sizes.push(levelSize)
        const obj = {
            prevRowLength: 0,
            arr: currentLevelNodesIndex
        }

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevelNodes.push(currentNode);

            // Add children of the current node to the queue
            currentNode.children.forEach(child => {
                queue.push(child);
                currentLevelNodesIndex.push(i + 1);
            });
        }
        canvasResult.push(obj);
        result.push(currentLevelNodes);
    }

    canvasResult.pop();
    sizes.pop();

    for (let i = 0; i < canvasResult.length; i++) {
        canvasResult[i].prevRowLength = sizes[i]
    }


    return {
        graphResult: result,
        canvasResult
    };
};

export const getNodeArrays = root => {
    const result = [];

    function traverse(node, level, index) {
        if (!node) {
            return;
        }

        if (!result[level]) {
            result[level] = [];
            const n = Math.pow(2, level);
            for (let i = 0; i < n; i++) {
                result[level].push(null)
            }
        }

        result[level][index] = node;

        traverse(node.left, level + 1, 2 * index);
        traverse(node.right, level + 1, 2 * index + 1);
    }

    traverse(root, 0, 0);
    return result;
}
