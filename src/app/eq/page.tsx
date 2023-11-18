'use client'

import React, { useState, ChangeEvent } from "react"


type NumberGrid = number[][];
type infoType = {
  one: {
    isOne: Boolean,
    isMinusOne: Boolean,
    devide: number,
    row: number,
    rowDevide: number,
    swappedRow: number,
    reversedSwappedRow: number,
    swappedWithAnotherFirstPara: number | null,
    swappedWithAnotherSecondPara: number | null,
    multSwappedWithAnother: number
  },
  zeros: {
    row: number,
    mult: number
  }[]
}
type solutionType = {
  info: infoType,
  array: NumberGrid
}

export default function Equation() {
  const [level, setLevel] = useState(1);
  const [eqNum, setEqNum] = useState(0);
  const [coefficient, setCoefficient] = useState<NumberGrid>([[]])
  const [answers, setAnswers] = useState<number[]>([]);
  const [solutions, setSolutions] = useState<solutionType[]>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, i: number, j: number) => {
    setLevel(2)
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setCoefficient(prev => {
        const newArr = prev.map(row => [...row]);
        newArr[i][j] = newValue;
        return newArr;
      });
    } else {
      setCoefficient(prev => {
        const newArr = prev.map(row => [...row]);
        newArr[i][j] = 0;
        return newArr;
      });
    }
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setLevel(2)
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setAnswers(prev => {
        const newArr = [...prev];
        newArr[index] = newValue;
        return newArr;
      })
    } else {
      setAnswers(prev => {
        const newArr = [...prev];
        newArr[index] = 0;
        return newArr;
      })
    }
  }

  const setArr = (num: number) => {
    const arr = Array(num).fill(Array(num).fill(0));
    const arr2 = Array(num).fill(0);
    setCoefficient(arr);
    setAnswers(arr2)
  };

  const eqNumChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) setEqNum(newValue);
  }

  const calculate = () => {
    const augmentedMatrix = coefficient.map((row, rowIndex) => [...row, answers[rowIndex]]);
    const equationsLength = augmentedMatrix.length;

    const result = [];

    // Applying Gauss-Jordan elimination 
    for (let j = 0; j < equationsLength; j++) {
      const tempMatrix = augmentedMatrix.map((row) => [...row]);
      const info: infoType = {
        one: {
          isOne: false,
          isMinusOne: false,
          devide: 0,
          row: 0,
          rowDevide: 0,
          swappedRow: 0,
          reversedSwappedRow: 0,
          swappedWithAnotherFirstPara: null,
          swappedWithAnotherSecondPara: null,
          multSwappedWithAnother: 0
        },
        zeros: []
      }

      // make 1

      if (tempMatrix[j][j] === 1) { //check if it's already one

        info.one.isOne = true;

      } else if (tempMatrix[j][j] === -1) {  //check if it's minus one

        for (let k = j; k <= equationsLength; k++) {
          tempMatrix[j][k] *= -1;
        }
        info.one.isMinusOne = true;

      } else {

        let isSwapped = false;

        //check if any index is one
        for (let i = j + 1; i < equationsLength; i++) {
          if (tempMatrix[i][j] === 1) {
            isSwapped = true;
            [tempMatrix[i], tempMatrix[j]] = [tempMatrix[j], tempMatrix[i]];
            info.one.swappedRow = i;
            break;
          }
        }

        //check if any index is minus one
        if (!isSwapped) {
          for (let i = j + 1; i < equationsLength; i++) {
            if (tempMatrix[i][j] === -1) {
              isSwapped = true;
              for (let k = j; k <= equationsLength; k++) {
                tempMatrix[i][k] *= -1;
              }
              [tempMatrix[i], tempMatrix[j]] = [tempMatrix[j], tempMatrix[i]];
              info.one.reversedSwappedRow = i;
              break;
            }
          }
        }

        //check if there is two number with modulus 1
        for (let i = j; i < equationsLength && !isSwapped; i++) {
          for (let i2 = j; i2 < equationsLength; i2++) {
            const def = tempMatrix[i][j] % tempMatrix[i2][j]
            if (def === 1) {
              console.log('i: ', i, ' j: ', j)
              const mult = (tempMatrix[i][j] - def) / tempMatrix[i2][j];
              info.one.swappedWithAnotherFirstPara = i;
              info.one.swappedWithAnotherSecondPara = i2;
              info.one.multSwappedWithAnother = mult;
              for (let k = 0; k <= equationsLength; k++) {
                tempMatrix[i][k] -= tempMatrix[i2][k] * mult
              }
              if (i !== j) [tempMatrix[i], tempMatrix[j]] = [tempMatrix[j], tempMatrix[i]];
              isSwapped = true;
              break;
            }
          }
        }

        //last option
        if (!isSwapped) {
          if (tempMatrix[j][j] !== 0) {
            const factor = tempMatrix[j][j];
            for (let k = j; k <= equationsLength; k++) {
              tempMatrix[j][k] /= factor;
            }
            info.one.devide = factor;
          } else {
            for (let i = 0; i < equationsLength; i++) {
              if (tempMatrix[i][j] !== 0) {
                const factor = tempMatrix[i][j];
                for (let k = j; k <= equationsLength; k++) {
                  tempMatrix[j][k] += tempMatrix[i][k] / factor;
                }
                info.one.row = i;
                info.one.rowDevide = factor;
                break;
              }
            }
          }
        }


      }

      // make 0s
      for (let i = 0; i < equationsLength; i++) {
        if (i !== j && tempMatrix[i][j] !== 0) {
          const factor = tempMatrix[i][j];
          for (let k = j; k <= equationsLength; k++) {
            tempMatrix[i][k] -= factor * tempMatrix[j][k];
          }
          info.zeros.push({
            mult: factor,
            row: i
          })
        }
      }


      //push to the permanent matrix
      for (let i = 0; i < augmentedMatrix.length; i++) {
        for (let j = 0; j < augmentedMatrix[i].length; j++) {
          augmentedMatrix[i][j] = tempMatrix[i][j];
        }
      }


      //push the results
      result.push({
        array: tempMatrix,
        info
      });
    }

    setSolutions(result);
  }





  return (
    <div className="container p-5">
      <div className={`mb-5 ${level === 1 ? '' : 'hidden'}`}>
        تعداد مجهولات را وارد کنید
        <br />
        <br />
        <input value={eqNum} onChange={(e) => eqNumChangeHandler(e)} type="number" className="border border-black pl-2" style={{ width: '60px' }} />
        <br />
        <br />
        <button className={`bg-cyan-500 mt-2 p-2 rounded-lg text-white`} onClick={() => { if (eqNum > 1) { setLevel(2); setArr(eqNum) }; }}>مرحله بعد</button>
      </div>
      <div className={`flex ${level === 2 ? '' : level === 3 ? '' : 'hidden'}`}>
        <div className={`flex justify-center border border-black p-2 relative`} style={{ width: `${68 * eqNum + 20}px` }}>
          <div className="absolute bg-white" style={{ width: '95%', height: '3px', top: '-1px', left: '50%', transform: 'translateX(-50%)' }} />
          <div>
            {coefficient.map((arr, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {arr.map((value, colIndex) => (
                  <span className="p-1" key={rowIndex * eqNum + colIndex}>
                    <input
                      value={value}
                      onChange={(e) => onChangeHandler(e, rowIndex, colIndex)}
                      type="text"
                      className="border mb-1 border-black pl-2"
                      style={{ width: "60px" }}
                    />
                    {
                      (colIndex + 1) % eqNum === 0 && <><br /></>
                    }
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="absolute bg-white" style={{ width: '95%', height: '3px', bottom: '-1px', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
        <div className="flex flex-col justify-evenly ml-2 py-2">
          {answers.map((v, index) => (
            <input
              key={index}
              value={v}
              onChange={(e) => onAnswerChangeHandler(e, index)}
              type="text"
              className="border border-black pl-2"
              style={{ width: "60px" }}
            />
          ))}
        </div>
      </div>
      <button className={`bg-cyan-500 text-white ${level === 2 ? '' : level === 3 ? '' : 'hidden'} mt-2 p-2 rounded-xl`} onClick={() => { setLevel(3); calculate() }}>محاسبه</button>
      <br />
      <br />
      <div className={`${level === 3 ? '' : 'hidden'}`}>
        {solutions.map((solution, index) => (
          <div key={index + 1000}>
            <div dir="rtl" className="text-center">
              {
                solution.info.one.isOne ? <div>سطر {index + 1} و ستون {index + 1} به خودی خود یک هست و کاریش نداریم</div>
                  : solution.info.one.isMinusOne ?
                    <div>سطر {index + 1} را قرینه میکنیم</div>
                    : solution.info.one.swappedRow !== 0 ?
                      <div>سطر {solution.info.one.swappedRow + 1} را با سطر {index + 1} جا به جا میکنیم</div>
                      : solution.info.one.swappedWithAnotherFirstPara !== null ?
                        <div>
                          {
                            solution.info.one.multSwappedWithAnother !== 1 &&
                            <>
                              <span dir="ltr">{solution.info.one.multSwappedWithAnother}</span> <span> برابر </span>
                            </>
                          }
                          سطر &nbsp;
                          {(solution.info.one.swappedWithAnotherSecondPara as number) + 1} را از سطر {solution.info.one.swappedWithAnotherFirstPara + 1} کم میکنیم و حاصل را با سطر {index + 1} جا به جا میکنیم</div>
                        : solution.info.one.reversedSwappedRow !== 0 ?
                          <div>سطر {solution.info.one.reversedSwappedRow + 1} را قرینه و با سطر {index + 1} جا به جا میکنیم</div>
                          : solution.info.one.devide !== 0 ?
                            <div>سطر {index + 1} را تقسیم بر <span dir="ltr">{Math.round(solution.info.one.devide * 100) / 100}</span> میکنیم</div>
                            : <div>
                              {
                                solution.info.one.rowDevide !== 1 &&
                                <>
                                  <span dir="ltr">{Math.round(solution.info.one.rowDevide * 1000) / 1000}</span>/1 برابر&nbsp;
                                </>
                              }
                              سطر {solution.info.one.row + 1} را از سطر {index + 1} کم میکنیم
                            </div>
              }
              {
                solution.info.zeros.map((innerV, innerIndex) => (
                  <div key={innerIndex}>
                    {
                      innerV.mult !== 1 &&
                      <>
                        <span dir="ltr">{Math.round(innerV.mult * 1000) / 1000}</span>  برابر&nbsp;
                      </>
                    }
                    سطر {index + 1} را از سطر {innerV.row + 1} کم میکنیم
                  </div>
                ))
              }
            </div>
            <br />
            <div className={`flex ${level === 2 ? '' : level === 3 ? '' : 'hidden'}`}>
              <div className={`mx-auto border border-black p-2 relative`} style={{ width: `${68 * eqNum + 90}px` }}>
                <div className="absolute bg-white" style={{ width: '95%', height: '3px', top: '-1px', left: '50%', transform: 'translateX(-50%)' }} />
                <div>
                  {solution.array.map((arr, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {arr.map((value, colIndex) => (
                        <React.Fragment key={colIndex * 221}>
                          <span
                            key={rowIndex * eqNum + colIndex}
                            style={{ width: "60px" }}
                            dir="ltr"
                            className="border border-black text-center inline-block m-1"
                          >
                            {Math.round(value * 1000) / 1000}
                          </span>
                          {
                            (colIndex + 1) % (eqNum + 1) === 0 && <br />
                          }
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                <div className="absolute bg-white" style={{ width: '95%', height: '3px', bottom: '-1px', left: '50%', transform: 'translateX(-50%)' }} />
              </div>
            </div>
            <br /><br /><br />
          </div>
        ))}
      </div>


    </div>
  )
}