import Canvas from '../tarrahi-algorithm/Canvas'
import Node from './Node'

export default function Graph({ arr }) {
    const height = (arr.length) * 100
    const width = (Math.pow(2, arr.length - 1)) * 50 + 20 * arr.length

    return (
        <div style={{ position: 'relative', width }} className='mx-auto'>
            <div className='mt-5 mb-2'>مجموع فرکانس ها: {arr[0][0].totalCost}</div>
            <Canvas height={height} width={width} arr={arr} />
            {
                arr.map((subArr, i) => {
                    return (
                        <div key={i} className='flex justify-evenly' style={{ marginBottom: '50px' }}>
                            {
                                subArr.map((v, i) => {
                                    const isNull = !v;
                                    return (<Node obj={v} key={i} isNull={isNull} />)
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
