'use client'
import Link from 'next/link'
import { navigationItems } from '@/constants'
import { useState } from 'react'
const Nav = () => {
    const [activeId, setActiveId] = useState(1);

  return (
    <nav className='flex items-center justify-between w-full h-[60px]'>
        <Link href="/">
          <h1 className='text-3xl font-bold text-primary '>Biyaa</h1>
        </Link>
        <div className=' flex items-center gap-8'>
           {navigationItems.map((item) => (
            <Link onClick={() => setActiveId(item.id)} href={item.href} key={item.id}>
              <h1 className={` font-semibold ${activeId === item.id ? 'text-primary' : 'text-gray'} hover:scale-105 transition-all duration-300`}>{item.name}</h1>
            </Link>
           ))}
        </div>
          <div className='flex items-center gap-4'>
            <Link href="/sign-in">
              <button className='btn-primary'>Sign In</button>
          </Link>
          <Link href="/sign-up">
            <button className='btn-secondary'>Sign Up</button>
          </Link>
        </div>
       </nav>
  )
}

export default Nav
