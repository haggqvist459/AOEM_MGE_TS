import { Outlet, useLocation } from "react-router-dom";
import { NavBar, Footer, FadeWrapper } from '@/components'


const MainLayout = () => {
  const location = useLocation()
  
  return (
    <div className="bg-neutral-200 min-h-screen flex flex-col relative">
      <NavBar />
      <div className="flex-grow">
        <FadeWrapper key={location.pathname}>
          <Outlet />
        </FadeWrapper>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;
