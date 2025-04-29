import React from "react";

type Props = {
  children: React.ReactNode
}
const GridWrapper = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} className="w-full">{child}</div>
      ))}
    </div>
  )
}

export default GridWrapper;