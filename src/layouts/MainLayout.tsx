import { Outlet } from "react-router-dom";
import { Header, Footer } from '@/components'


const MainLayout = () => {
  return (
    <div className="bg-neutral-200 min-h-screen flex flex-col relative">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;

/*
footer padding:
pb-[env(safe-area-inset-bottom)]
*/