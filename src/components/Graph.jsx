import Matrix from './Matrix'
import Canvas from './Canvas'
import { highestNodesInLevel, hightOfTree } from '../utils/usefullFunctions'

// breadth-first search (BFS) algorithm to convert the tree into an array of arrays
const convertTreeToArray = root => {
    const result = [];

    if (!root) {
        return result;
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

        result.push(currentLevelNodes);
    }

    return result;
};



export default function Graph({ tree }) {

    const width = highestNodesInLevel(tree) * 160
    const height = hightOfTree(tree) * 250

    return (
        <div style={{ position: 'relative', width }}>
            <Canvas height={height} width={width} rootNode={tree} />
            {
                convertTreeToArray(tree).map((row, index) => {
                    return (
                        <div key={index} className='flex justify-evenly' style={{ marginBottom: '120px' }}>
                            {
                                row.map((node, i) => {
                                    return (
                                        <div key={i}>
                                            <Matrix matrix={node.mat} cost={node.cost + ' + ' + index} isSmallest={false} />
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
