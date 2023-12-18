'use client'
import React, { useState } from 'react'
import Graph from '../../components/eight/Graph'
import MovingMatrix from '../../components/eight/MovingMatrix'
import { eightSolver } from '../../utils/eight/eightAlgirithm'
import { checkInputs, isSolvable } from '../../utils/eight/usefullFunctions'


export default function Home() {
  const [res, setRes] = useState([])
  const [moves, setMoves] = useState([])
  const [level, setLevel] = useState(1)
  const [N, setN] = useState(3)
  const [isFalse, setIsFalse] = useState(false)
  const [hasAnswer, setHasAnswer] = useState(true)
  const [isManhatan, setIsManhatan] = useState(false)
  const [matrix, setMatrix] = useState([])
  const [matrixnNum, setMatrixNum] = useState([])
  const [finalMatrix, setFinalMatrix] = useState([])

  const NChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) setN(newValue);
  }

  const setArr = (num) => {
    const arr = Array(num).fill(Array(num).fill(''));
    const arr2 = Array(num).fill(Array(num).fill(''))
    setMatrix(arr)
    setFinalMatrix(arr2)
  };

  const onChangeHandler = (e, i, j) => {
    setLevel(2)
    setIsFalse(false)
    setHasAnswer(true)
    setMatrix(prev => {
      const newArr = prev.map(row => [...row]);
      newArr[i][j] = e.target.value;
      return newArr;
    });
  }
  const onChangeHandler2 = (e, i, j) => {
    setLevel(2)
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
    setMatrixNum(matris)
    const finalMatris = finalMatrix.map(row => row.map(val => parseInt(val) || 0));
    let zeroX, zeroY;
    //check the inputs
    let shouldContinue = checkInputs(matris, finalMatris);

    if (!shouldContinue) {
      setIsFalse(true)
      return
    }

    //where is zero located
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (matris[i][j] === 0) {
          zeroX = i;
          zeroY = j;
          break
        }
      }
    }

    // Check if the initial matrix is solvable
    if (isSolvable(matris, finalMatris)) {
      const res = eightSolver(matris, zeroX, zeroY, finalMatris, isManhatan);
      setRes(res.root);
      setMoves(res.actions);
      setLevel(3);
    } else {
      setHasAnswer(false)
    }

  }



  return (
    <div className='m-5'>
      {
        level === 1 ?
          <div className='mb-5'>
            طول آرایه وارد کنید
            <br />
            <br />
            <input value={N} onChange={(e) => NChangeHandler(e)} type="number" className="border border-black pl-2" style={{ width: '60px' }} />
            <br />
            <br />
            <button className={`bg-cyan-500 mt-2 p-2 rounded-lg text-white`} onClick={() => { if (N > 2) { setLevel(2); setArr(N) }; }}>مرحله بعد</button>
          </div>
          : <></>
      }
      {
        level !== 1 ?
          <>
            <input type="checkbox" value={isManhatan} onChange={() => {
              setIsManhatan(prev => !prev);
              setLevel(2)
            }} />
            &nbsp;
            : روش منهتن دیستنس
            <br />
            <br />
            : حالت اولیه
            <div className='mt-3'>
              {matrix.map((arr, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {arr.map((value, colIndex) => (
                    <span className="p-1" key={rowIndex * N + colIndex}>
                      <input
                        value={value}
                        onChange={(e) => onChangeHandler(e, rowIndex, colIndex)}
                        type="text"
                        className="border mb-1 border-black pl-2"
                        style={{ width: "60px" }}
                      />
                      {
                        (colIndex + 1) % N === 0 && <><br /></>
                      }
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <br />
            👇
            <br />
            <br />
            : حالت نهایی
            <div className='mt-3'>
              {finalMatrix.map((arr, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {arr.map((value, colIndex) => (
                    <span className="p-1" key={rowIndex * N + colIndex}>
                      <input
                        value={value}
                        onChange={(e) => onChangeHandler2(e, rowIndex, colIndex)}
                        type="text"
                        className="border mb-1 border-black pl-2"
                        style={{ width: "60px" }}
                      />
                      {
                        (colIndex + 1) % N === 0 && <><br /></>
                      }
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <br />
            <button className="bg-cyan-500 mt-2 p-2 rounded-lg text-slate-50" onClick={onClickHandler}>! حل</button>

            <div>
              {
                isFalse ?
                  <div className='bg-red-500 mt-2 p-2 rounded-lg text-slate-50 text-center'>
                    !پازل باید شامل اعداد 0 تا {N * N - 1} و بدون تکرار باشد
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
          </>
          : <></>
      }
      <div>
        {
          level === 3 ?
            <>
              <div className='m-4'>
                <MovingMatrix root={matrixnNum} moves={moves} />

              </div>
              <button className="bg-cyan-500 mt-2 p-2 rounded-lg text-slate-50" onClick={() => setLevel(4)}>نمایش گراف</button>
            </>
            : <></>
        }
      </div>
      <div>
        {
          level === 4 ?
            <div className='m-4'>
              <Graph tree={res} />
            </div>
            : <></>
        }
      </div>
    </div>
  )
}
