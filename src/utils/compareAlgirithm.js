// 1. Live node is a node that has been generated but whose children have not yet been generated. 
// 2. E - node is a live node whose children are currently being explored.In other words, an E - node is a node currently being expanded. 
// 3. Dead node is a generated node that is not to be expanded or explored any further.All children of a dead node have already been expanded.


const N = 3;

class Node {
    constructor(mat, x, y, level) {

        // Stores matrix
        this.mat = mat.map(row => [...row]);

        // Stores blank tile coordinates
        this.x = x;
        this.y = y;

        // Stores the number of misplaced tiles
        this.cost = Infinity;

        // Stores the number of moves so far
        this.level = level;

        this.children = [];
        this.prevMove = -1;
    }

    set setChildren(children) {
        this.children = children.map(child => child.map(row => [...row]));
    }

}

// Function to allocate a new node
function newNode(mat, x, y, newX, newY, level) {
    const node = new Node(mat, x, y, level);

    // Move tile by 1 position
    [node.mat[x][y], node.mat[newX][newY]] = [node.mat[newX][newY], node.mat[x][y]];

    // Update new blank tile coordinates
    node.x = newX;
    node.y = newY;

    return node;
}

// Bottom, left, top, right
const rowMove = [1, 0, -1, 0];
const colMove = [0, -1, 0, 1];

// Function to calculate the number of misplaced tiles
// i.e., number of non-blank tiles not in their goal position
function calculateCost(initial, final) {
    let count = 0;
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++)
            if (initial[i][j] && initial[i][j] !== final[i][j])
                count++;
    return count;
}


// Function to check if (x, y) is a valid matrix coordinate
function isSafe(x, y) {
    return x >= 0 && x < N && y >= 0 && y < N;
}

// Comparison object to be used to order the heap
class comp {
    static compare(lhs, rhs) {
        return (lhs.cost + lhs.level) > (rhs.cost + rhs.level);
    }
}

export function compareSolver(initial, x, y, final) {
    // Create an array to store live nodes of the search tree
    const pq = [];
    const resault = [];
    const obj = {
        node: null,
        cost: 0,
        isSmallest: false
    }

    // Create a root node and calculate its cost
    const root = newNode(initial, x, y, x, y, 0);
    root.cost = calculateCost(initial, final);

    // Add root to the array of live nodes
    pq.push(root);
    // obj.node = root;
    // const tempo = []
    // tempo.push(obj);
    // resault.push(tempo);


    // Find a live node with the least cost,
    // add its children to the array of live nodes, and
    // finally delete it from the array
    while (pq.length > 0) {

        const tempArr = [];

        // Find a live node with the least estimated cost
        pq.sort(comp.compare);
        const min = pq.shift();

        // If min is an answer node
        if (min.cost === 0) {
            // Print the path from root to destination
            // printPath(min);
            break;
        }

        // Do for each child of min
        // Max 4 children for a node
        for (let i = 0; i < 4; i++) {
            if (isSafe(min.x + rowMove[i], min.y + colMove[i])) {
                // Create a child node and calculate its cost
                const child = newNode(min.mat, min.x, min.y, min.x + rowMove[i], min.y + colMove[i], min.level + 1);

                child.cost = calculateCost(child.mat, final);
                child.prevMove = i;

                // Check if the child node is not the same as the parent node
                if (min.prevMove === -1 || Math.abs(min.prevMove - child.prevMove) !== 2) {
                    min.children.push(child);
                }
                // obj.cost = child.cost + child.level;
                // tempArr.push(obj)
            }
        }

        pq.push(...min.children);
        // resault.push(tempArr);

    }

    // return resault;
    return root;
}