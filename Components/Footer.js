import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center my-[30px]'>
        <Link  href="https://news.ycombinator.com/">
            Used Hacker News API 
        </Link>
        <Link  href="https://github.com/YugBhanushali">
            Made by Yug Bhanushali
        </Link>
    </div>
  )
}

export default Footer
