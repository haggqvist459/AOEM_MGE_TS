import { Outlet } from "react-router-dom";



const MainLayout = () => {
  return (
    <div className="bg-neutral-200 h-[100dvh] flex flex-col">
        <Outlet />    
    </div>
  )
}

export default MainLayout;