import Nav from '@/components/Nav';
import React, { ReactNode } from 'react'

const RootLayout = async ({children} : {children: ReactNode}) => {
  
    

  return (
    <div className=' w-full h-screen px-4 sm:px-8 md:px-12 lg:px-[100px]  py-[20px]'>
       <Nav />
      {children}
    </div>
  )
}

export default RootLayout;