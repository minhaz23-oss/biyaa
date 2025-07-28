import React from 'react';

interface LoaderProps {
  color?: string;
  height?: string | number;
  width?: string | number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  color, 
  height , 
  width ,
  className
}) => {
  const sizeStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <div 
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      style={{
        ...sizeStyle,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
