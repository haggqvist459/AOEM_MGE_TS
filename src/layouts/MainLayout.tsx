import { Outlet } from "react-router-dom";
import { Header, Footer } from '@/components'


const MainLayout = () => {
  return (
    <div className="bg-neutral-200 h-[100dvh] flex flex-col relative">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="bg-primary sticky bottom-0">
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout;

/*
footer padding:
pb-[env(safe-area-inset-bottom)]
*/