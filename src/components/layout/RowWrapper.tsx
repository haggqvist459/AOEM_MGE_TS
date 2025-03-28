import React from "react";

type Props = {
  children: React.ReactNode
}
const RowWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col xs:flex-row xs:space-x-1 w-full">
      {React.Children.map(children, (child) => (
        <div className="w-full">{child}</div>
      ))}
    </div>
  )
}

export default RowWrapper;