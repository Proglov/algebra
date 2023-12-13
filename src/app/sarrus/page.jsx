'use client'

import { useState } from "react"


export default function Sarus() {
  const [stringNums, setStringNums] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [nums, setNums] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])

  const [hidden, setHidden] = useState(true)

  const onChangeHandler = (e, i, j) => {
    setStringNums(prev => {
      const newArr = prev.map(row => [...row]);
      newArr[i][j] = e.target.value;
      return newArr;
    });
  }

  const onClickHandler = () => {
    const arr = stringNums.map(row => row.map(v => parseFloat(v)))
    setNums(arr)
    setHidden(false)
  }

  return (
    <div className="container p-5">
      <div className="flex">
        <div className="grid grid-cols-3 gap-1 border border-black p-2 relative" style={{ width: '220px' }}>
          <div className="absolute bg-white" style={{ width: '95%', height: '3px', top: '-1px', left: '6px' }}></div>
          <input value={stringNums[0][0]} onChange={(e) => onChangeHandler(e, 0, 0)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[0][1]} onChange={(e) => onChangeHandler(e, 0, 1)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[0][2]} onChange={(e) => onChangeHandler(e, 0, 2)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[1][0]} onChange={(e) => onChangeHandler(e, 1, 0)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[1][1]} onChange={(e) => onChangeHandler(e, 1, 1)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[1][2]} onChange={(e) => onChangeHandler(e, 1, 2)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[2][0]} onChange={(e) => onChangeHandler(e, 2, 0)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[2][1]} onChange={(e) => onChangeHandler(e, 2, 1)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[2][2]} onChange={(e) => onChangeHandler(e, 2, 2)} type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <div className="absolute bg-white" style={{ width: '95%', height: '3px', bottom: '-1px', left: '6px' }}></div>
        </div>
        <div className={`grid grid-cols-2 gap-1 p-2 ${hidden ? 'hidden' : ''}`} style={{ width: '150px' }}>
          <input value={stringNums[0][0]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[0][1]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[1][0]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[1][1]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[2][0]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
          <input value={stringNums[2][1]} disabled type="text" className="border border-black pl-2" style={{ width: '60px' }} />
        </div>
      </div>
      <button className="bg-cyan-500 mt-2 p-2 rounded-xl text-slate-50" onClick={onClickHandler}>محاسبه دترمینان</button>
      <div className={`${hidden ? 'hidden' : ''}`}>
        {`(${nums[0][0]} x ${nums[1][1]} x ${nums[2][2]}) + (${nums[0][1]} x ${nums[1][2]} x ${nums[2][0]}) + (${nums[0][2]} x ${nums[1][0]} x ${nums[2][1]}) - (${nums[0][2]} x ${nums[1][1]} x ${nums[2][0]}) - (${nums[2][1]} x ${nums[1][2]} x ${nums[0][0]}) - (${nums[2][2]} x ${nums[1][0]} x ${nums[0][1]})`}
        &nbsp; = &nbsp;
        {nums[0][0] * nums[1][1] * nums[2][2] + nums[0][1] * nums[1][2] * nums[2][0] + nums[0][2] * nums[1][0] * nums[2][1] - nums[0][2] * nums[1][1] * nums[2][0] - nums[2][1] * nums[1][2] * nums[0][0] - nums[2][2] * nums[1][0] * nums[0][1]}
      </div>
    </div>
  )
}