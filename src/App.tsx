import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { HomePage } from '@/pages';
import { ROUTES } from '@/utils';



const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
