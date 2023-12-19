import React from 'react'

export default function Node({ obj, isNull }) {
    return (
        <div className='pt-2 text-center'
            style={{
                width: '50px',
                height: '50px',
                border: `${isNull ? '' : '1px solid red'}`,
                borderRadius: '50%'
            }}>
            {
                isNull ?
                    <></> :
                    <>
                        <div>
                            {obj?.value}
                        </div>
                        <div className='mt-3'>{obj?.freq}%</div>
                    </>
            }

        </div>
    )
}
