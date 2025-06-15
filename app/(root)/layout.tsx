import Nav from '@/components/Nav';
import Link from 'next/link';
import React, { ReactNode } from 'react'

const RootLayout = async ({children} : {children: ReactNode}) => {
  
    

  return (
    <div className=' w-full h-screen px-[100px] py-[20px]'>
       <Nav />
      {children}
    </div>
  )
}

export default RootLayout;