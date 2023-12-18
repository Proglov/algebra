import React from "react"

export default function Matrix({ matrix, cost, isSmallest }) {
    const n = matrix.length;
    return (
        <div
            style={{
                width: `${n * 50}px`,
                height: `${n * 50}px`
            }}>
            {
                matrix.map(row => row.map((val, i) => {
                    return <span className="text-center pt-2" key={i} style={{
                        width: '50px',
                        height: '50px',
                        display: 'inline-block',
                        border: '1px solid gray'
                    }}>
                        {
                            val !== 0 ?
                                val
                                : <>&nbsp;</>
                        }
                    </span>
                }))
            }
            <div className="text-center mt-1">
                <span className={`${isSmallest ? 'rounded-full border border-red-500' : ''} pt-2.5`}
                    style={{ display: 'inline-block', width: '50px', height: '50px' }}>
                    {cost}
                </span>
            </div>
        </div>
    )
}
// <div style={{ width: '152px', height: '152px', border: '1px solid black' }}>
//     {
//         matrix.map(row => row.map((val, i) => {
//             return (
//                 <React.Fragment key={i}>
//                     <span className="text-center pt-2" style={{
//                         width: '50px',
//                         height: '50px',
//                         display: 'inline-block',
//                         border: '1px solid black'
//                     }}>
//                         {
//                             val !== 0 ?
//                                 val
//                                 : <>&nbsp;</>
//                         }
//                     </span>

//                     {
//                         i % 3 === 2 ?
//                             <br />
//                             : <></>
//                     }
//                 </React.Fragment>
//             )

//         }))
//     }
//     <div className="text-center mt-1">
//         <span className={`${isSmallest ? 'rounded-full border border-red-500' : ''} pt-2.5`}
//             style={{ display: 'inline-block', width: '50px', height: '50px' }}>
//             {cost}
//         </span>
//     </div>
// </div>