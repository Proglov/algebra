import Matrix from './Matrix'
import Canvas from './Canvas'
import { highestNodesInLevel, hightOfTree } from '../../utils/eight/usefullFunctions'

// breadth-first search (BFS) algorithm to convert the tree into an array of arrays
const convertTreeToArray = root => {
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



export default function Graph({ tree }) {
    const N = tree.mat.length
    const width = highestNodesInLevel(tree) * 50 * N + 50
    const height = hightOfTree(tree) * (50 * N + 120)
    const res = convertTreeToArray(tree);

    return (
        <div style={{ position: 'relative', width }} className='mx-auto'>
            <Canvas height={height} width={width} arr={res.canvasResult} N={N} />
            {
                res.graphResult.map((row, index) => {
                    return (
                        <div key={index} className='flex justify-evenly' style={{ marginBottom: '120px' }}>
                            {
                                row.map((node, i) => {
                                    return (
                                        <div key={i}>
                                            <Matrix matrix={node.mat} cost={node.cost + ' + ' + index} isSmallest={node.cost === 0} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
