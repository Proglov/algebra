'use client'
import React, { useState } from 'react'
import { customSort, getNodeArrays } from '../../utils/tarrahi-algorithm/usefullFunctions'
import { addFrequency } from '../../utils/tarrahi-algorithm/main'
import Graphs from '@/components/tarrahi-algorithm/Graphs';




export default function Home() {
  const [objectsArray, setObjectsArray] = useState([]);
  const [newObject, setNewObject] = useState({ value: '', freq: '' });
  const [res, setRes] = useState([]);
  const [level, setLevel] = useState(0);
  const [remain, setRemain] = useState(100)


  const onObjValueChangeHandler = (e, str) => setNewObject(obj => ({ ...obj, [str]: parseFloat(e.target.value) }))

  const addNewValueHandler = () => {
    setObjectsArray(prevArr => [...prevArr, newObject]);
    setRemain(prev => prev - newObject.freq);
    setNewObject({ value: '', freq: '' });
  }

  const calculate = () => {

    const rootNodes = addFrequency(customSort(objectsArray));
    const newRes = [];

    rootNodes.forEach((node) => {
      const nodeArrays = getNodeArrays(node);
      newRes.push(nodeArrays);
    });

    setRes(newRes);
    setLevel(1);
  }

  return (
    <div>

      {/* table  */}
      {
        objectsArray.length !== 0 &&
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-lefttext-gray-400">
            <tbody>
              <tr className="bg-gray-800 border-gray-700 text-white">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                  مقدار
                </th>
                {
                  objectsArray.map((object, index) => {
                    return (
                      <td className="px-6 py-4" key={index}>
                        {object.value}
                      </td>
                    )
                  })
                }
                <td className="px-6 py-4">

                </td>
              </tr>
              <tr className="bg-gray-800 border-gray-700 text-white">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                  فرکانس
                </th>
                {
                  objectsArray.map((object, index) => {
                    return (
                      <td className="px-6 py-4" key={index}>
                        {object.freq}
                      </td>
                    )
                  })
                }
                <td className="px-6 py-4" style={{ direction: 'rtl' }}>
                  {remain}&nbsp;
                  درصد باقی مانده
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }

      {
        remain > 0 &&
        <>

          <input
            value={newObject.value}
            onChange={e => onObjValueChangeHandler(e, 'value')}
            type="number"
            placeholder='مقدار'
            className="border mt-5 ml-5 border-black pl-1"
            style={{ width: "80px" }}
          />
          <input
            value={newObject.freq}
            onChange={e => onObjValueChangeHandler(e, 'freq')}
            type="number"
            placeholder='فرکانس'
            className="border mt-5 ml-2 border-black pl-1"
            style={{ width: "80px" }}
          />
          <br />
          <button className={`bg-cyan-500 m-5 p-2 rounded-lg text-white`} onClick={addNewValueHandler}>اضافه کردن داده جدید</button>

          <br />
        </>
      }

      {
        remain < 1 && level === 0 &&
        <>
          <button className={`bg-cyan-500 m-5 p-2 rounded-lg text-white`} onClick={calculate}>! حل</button>
        </>
      }

      {
        level === 1 &&
        <Graphs res={res} />
      }

    </div>
  )
}
