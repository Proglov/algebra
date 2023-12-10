'use client'
import { useState } from 'react'
import Graph from '../components/Graph'
import { compareSolver } from '../utils/compareAlgirithm'
import { checkInputs, isSolvable } from '../utils/usefullFunctions'


export default function Home() {
  const [res, setRes] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [isFalse, setIsFalse] = useState(false)
  const [hasAnswer, setHasAnswer] = useState(true)
  const [matrix, setMatrix] = useState([
    ['1', '6', '2'],
    ['4', '0', '3'],
    ['7', '5', '8']
  ])
  const [finalMatrix, setFinalMatrix] = useState([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '0']
  ])

  const onChangeHandler = (e, i, j) => {
    setShowAnswer(false)
    setIsFalse(false)
    setHasAnswer(true)
    setMatrix(prev => {
      const newArr = prev.map(row => [...row]);
      newArr[i][j] = e.target.value;
      return newArr;
    });
  }
  const onChangeHandler2 = (e, i, j) => {
    setShowAnswer(false)
    setIsFalse(false)
    setHasAnswer(true)
    setFinalMatrix(prev => {
      const newArr = prev.map(row => [...row]);
      newArr[i][j] = e.target.value;
      return newArr;
    });
  }

  const onClickHandler = () => {
    const matris = matrix.map(row => row.map(val => parseInt(val) || 0));
    const finalMatris = finalMatrix.map(row => row.map(val => parseInt(val) || 0));
    let zeroX, zeroY;
    //check the inputs
    let shouldContinue = checkInputs(matris, finalMatris);

    if (!shouldContinue) {
      setIsFalse(true)
      return
    }

    //where is zero located
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matris[i][j] === 0) {
          zeroX = i;
          zeroY = j;
          break
        }
      }
    }

    // Check if the initial matrix is solvable
    if (isSolvable(matris)) {
      const res = compareSolver(matris, zeroX, zeroY, finalMatris);
      setRes(res);
      setShowAnswer(true);
    } else {
      setHasAnswer(false)
    }

  }



  return (
    <div className='m-5'>
      : حالت اولیه
      <div className="mt-3 grid grid-cols-3 relative" style={{ width: '150px' }}>
        <input value={matrix[0][0]} onChange={(e) => onChangeHandler(e, 0, 0)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[0][1]} onChange={(e) => onChangeHandler(e, 0, 1)} type="text" className="border border-t-black border-b-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[0][2]} onChange={(e) => onChangeHandler(e, 0, 2)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[1][0]} onChange={(e) => onChangeHandler(e, 1, 0)} type="text" className="border border-l-black border-r-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[1][1]} onChange={(e) => onChangeHandler(e, 1, 1)} type="text" className="border border-b-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[1][2]} onChange={(e) => onChangeHandler(e, 1, 2)} type="text" className="border border-r-black border-l-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[2][0]} onChange={(e) => onChangeHandler(e, 2, 0)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[2][1]} onChange={(e) => onChangeHandler(e, 2, 1)} type="text" className="border border-b-black pl-2" style={{ width: '50px' }} />
        <input value={matrix[2][2]} onChange={(e) => onChangeHandler(e, 2, 2)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
      </div>
      <br />
      👇
      <br />
      <br />
      : حالت نهایی
      <div className="mt-3 grid grid-cols-3 relative" style={{ width: '150px' }}>
        <input value={finalMatrix[0][0]} onChange={(e) => onChangeHandler2(e, 0, 0)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[0][1]} onChange={(e) => onChangeHandler2(e, 0, 1)} type="text" className="border border-t-black border-b-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[0][2]} onChange={(e) => onChangeHandler2(e, 0, 2)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[1][0]} onChange={(e) => onChangeHandler2(e, 1, 0)} type="text" className="border border-l-black border-r-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[1][1]} onChange={(e) => onChangeHandler2(e, 1, 1)} type="text" className="border border-b-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[1][2]} onChange={(e) => onChangeHandler2(e, 1, 2)} type="text" className="border border-r-black border-l-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[2][0]} onChange={(e) => onChangeHandler2(e, 2, 0)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[2][1]} onChange={(e) => onChangeHandler2(e, 2, 1)} type="text" className="border border-b-black pl-2" style={{ width: '50px' }} />
        <input value={finalMatrix[2][2]} onChange={(e) => onChangeHandler2(e, 2, 2)} type="text" className="border border-black pl-2" style={{ width: '50px' }} />
      </div>
      <br />
      <button className="bg-cyan-500 mt-2 p-2 rounded-lg text-slate-50" onClick={onClickHandler}>! حل</button>

      <div>
        {
          isFalse ?
            <div className='bg-red-500 mt-2 p-2 rounded-lg text-slate-50 text-center'>
              !پازل باید شامل اعداد 0 تا 8 و بدون تکرار باشد
            </div>
            : <></>
        }
      </div>
      <div>
        {
          !hasAnswer ?
            <div className='bg-yellow-500 mt-2 p-2 rounded-lg text-slate-50 text-center'>
              !پازل فوق جوابی ندارد
            </div>
            : <></>
        }
      </div>
      <div className=''>
        {
          showAnswer ?
            <div className='m-4'>
              <Graph tree={res} />
            </div>
            : <></>
        }
      </div>
    </div>
  )
}
