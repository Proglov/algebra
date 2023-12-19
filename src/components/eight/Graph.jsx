import Matrix from './Matrix'
import Canvas from './Canvas'
import { highestNodesInLevel, hightOfTree, convertTreeToArray } from '../../utils/eight/usefullFunctions'

export default function Graph({ tree }) {
    const N = tree.mat.length
    const width = highestNodesInLevel(tree) * (50 * N + 15)
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
