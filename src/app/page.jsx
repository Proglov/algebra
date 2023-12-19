import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='text-purple-700 m-5'>
        <Link href='/eq'>حل معادله به روش گاوس جردن</Link>
      </div>
      <div className='text-purple-700 m-5'>
        <Link href='/sarrus'>محاسبه دترمینان ماتریس 3*3 به روش ساروس</Link>
      </div>
      <div className='text-purple-700 m-5'>
        <Link href='/eight'>حل پازل هشت</Link>
      </div>
      <div className='text-purple-700 m-5'>
        <Link href='/tarrahi-algorithm'>طراحی الگوریتم</Link>
      </div>
    </>
  )
}