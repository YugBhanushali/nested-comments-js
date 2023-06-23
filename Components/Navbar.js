import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='flex flex-row mb-6'>
      <Link href={"https://github.com/YugBhanushali/nested-comments-js"}>
        <AiFillGithub
            color='white'
            size={30}
        />
      </Link>
    </div>
  )
}

export default Navbar
