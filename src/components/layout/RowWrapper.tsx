import React from "react";

type Props = {
  children: React.ReactNode
}
const RowWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col xs:flex-row xs:space-x-1 w-full">
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} className="w-full">{child}</div>
      ))}
    </div>
  )
}

export default RowWrapper;