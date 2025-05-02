import React from "react";

type Props = {
  children: React.ReactNode,
  columns?: number
}
const GridWrapper = ({ 
  children,
  columns = 1
}: Props) => {

  const columnClass = `grid-cols-1 xs:grid-cols-${columns} md:grid-cols-2`

  return (
    <div className={`grid ${columnClass} gap-1`}>
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} className="w-full self-end">{child}</div>
      ))}
    </div>
  )
}

export default GridWrapper;