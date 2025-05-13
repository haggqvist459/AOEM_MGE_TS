import { Outlet } from "react-router-dom";
import { NavBar, Footer } from '@/components'


const MainLayout = () => {
  return (
    <div className="bg-neutral-200 min-h-screen flex flex-col relative">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;
