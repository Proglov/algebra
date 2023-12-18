// 1. Live node is a node that has been generated but whose children have not yet been generated. 
// 2. E - node is a live node whose children are currently being explored.In other words, an E - node is a node currently being expanded. 
// 3. Dead node is a generated node that is not to be expanded or explored any further.All children of a dead node have already been expanded.


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
        this.parent = null;
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
function calculateCost(initial, final, N) {
    let count = 0;
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++)
            if (initial[i][j] && initial[i][j] !== final[i][j])
                count++;
    return count;
}

// Function to calculate the Manhattan distance heuristic
function calculateCostManhatan(initial, final, N) {
    let cost = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const tile = initial[i][j];
            if (tile !== 0) {
                const goalPos = findTilePosition(final, tile, N);
                cost += Math.abs(i - goalPos.row) + Math.abs(j - goalPos.col);
            }
        }
    }
    return cost;
}

// Function to find the position (row, col) of a tile in a matrix
function findTilePosition(matrix, tile, N) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] === tile) {
                return { row: i, col: j };
            }
        }
    }
}

// Function to check if (x, y) is a valid matrix coordinate
function isSafe(x, y, N) {
    return x >= 0 && x < N && y >= 0 && y < N;
}

// Comparison object to be used to order the heap
class comp {
    static compare(lhs, rhs) {
        return (lhs.cost + lhs.level) > (rhs.cost + rhs.level);
    }
}


export function eightSolver(initial, x, y, final, isManhatan) {
    const N = initial.length;
    // Create an array to store live nodes of the search tree
    const pq = [];

    const actions = [];

    // Create a root node and calculate its cost
    const root = newNode(initial, x, y, x, y, 0);
    root.cost = isManhatan ? calculateCostManhatan(initial, final, N) : calculateCost(initial, final, N);

    // Add root to the array of live nodes
    pq.push(root);

    // Find a live node with the least cost,
    // add its children to the array of live nodes, and
    // finally delete it from the array
    while (pq.length > 0) {

        // Find a live node with the least estimated cost
        pq.sort(comp.compare);
        const min = pq.shift();

        // console.log(min.mat)

        // If min is an answer node or the height is more than 20
        if (min.cost === 0 || min.level > 20) {
            const arr = [];
            arr.push(min)
            actions.push(min.prevMove)
            while (true) {
                const par = arr.pop().parent;
                if (par.prevMove === -1) {
                    break;
                }
                arr.push(par)
                actions.push(par.prevMove)
            }
            break;
        }

        // Do for each child of min
        // Max 4 children for a node
        for (let i = 0; i < 4; i++) {
            const newX = min.x + rowMove[i], newY = min.y + colMove[i];
            if (isSafe(newX, newY, N)) {
                // Create a child node and calculate its cost
                const child = newNode(min.mat, min.x, min.y, newX, newY, min.level + 1);
                child.parent = min;

                child.cost = isManhatan ? calculateCostManhatan(child.mat, final, N) : calculateCost(child.mat, final, N);
                child.prevMove = i;

                // Check if the child node is not the same as the parent node
                if (min.prevMove === -1 || Math.abs(min.prevMove - child.prevMove) !== 2) {
                    min.children.push(child);
                }
            }
        }

        pq.push(...min.children);
    }

    // return resault;
    const resault = {
        root,
        actions
    }
    return resault;
}