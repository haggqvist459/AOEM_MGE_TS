import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { AboutPage, AdminPage, HomePage, PreviousEventScorePage, TotalScorePage } from '@/pages';
import { ROUTES } from '@/utils';



const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />}/>
          <Route path={ROUTES.ADMIN} element={<AdminPage />}/>
          <Route path={ROUTES.PREVIOUS_SCORE} element={<PreviousEventScorePage />} />
          <Route path={ROUTES.TOTAL_SCORE} element={<TotalScorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
