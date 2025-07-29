import Nav from '@/components/Nav';
import React, { ReactNode } from 'react';

const GuideLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen px-[20px] sm:px-[100px] py-[20px]">
      <Nav />
      {children}
    </div>
  );
};

export default GuideLayout;
