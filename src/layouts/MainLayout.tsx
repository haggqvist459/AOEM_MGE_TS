import { Outlet } from "react-router-dom";
import { Header, Footer } from '@/components'


const MainLayout = () => {
  return (
    <div className="bg-neutral-200 h-[100dvh] flex flex-col relative">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="sticky bottom-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout;