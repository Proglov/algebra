class Node {
    constructor(obj) {
        this.value = obj.value;
        this.freq = obj.freq;
        this.left = null;
        this.right = null;
    }
}

function createBinaryTrees(arr) {
    if (arr.length === 0) {
        return [];
    }

    const nodes = arr.map(obj => new Node(obj));

    function generateTrees(start, end) {
        if (start > end) {
            return [null];
        }

        const trees = [];

        for (let i = start; i <= end; i++) {
            const leftSubtrees = generateTrees(start, i - 1);
            const rightSubtrees = generateTrees(i + 1, end);

            for (let left of leftSubtrees) {
                for (let right of rightSubtrees) {
                    const current = new Node(nodes[i]);
                    current.left = left;
                    current.right = right;
                    trees.push(current);
                }
            }
        }

        return trees;
    }

    return generateTrees(0, nodes.length - 1);
}

function calculateTotalFrequency(root) {
    if (root === null) {
        return 0;
    }

    return calculateNodeFrequency(root, 1); // Start with level 1 for the root node
}

function calculateNodeFrequency(node, level) {
    if (node === null) {
        return 0;
    }

    let frequency = node.freq * level; // Calculate the frequency of the node

    // Recursively calculate the frequencies of the left and right subtrees
    let leftFrequency = calculateNodeFrequency(node.left, level + 1);
    let rightFrequency = calculateNodeFrequency(node.right, level + 1);

    return frequency + leftFrequency + rightFrequency;
}



export const addFrequency = arr => {
    const nodes = createBinaryTrees(arr);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].totalCost = (calculateTotalFrequency(nodes[i]))
    }
    return nodes
}