import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from '../context/PrivateRoute';
import BusinessNav from './components/BusinessNav';
import DashboardPage from './pages/DashboardPage';
import ProfitPage from './pages/ProfitPage';
import EditPage from './pages/EditPage';
import ShowcasePage from './pages/ShowcasePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import LoginPage from '../shared/pages/LoginPage';
import RegisterPage from '../shared/pages/RegisterPage';

export default function BusinessApp() {
    return (
      <BrowserRouter>
        <BusinessNav />
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
          <Route path='/profit' element={<PrivateRoute allowedRoles={["business"]}><ProfitPage/></PrivateRoute>}/>
          <Route path='/' element={<PrivateRoute allowedRoles={["business"]}><DashboardPage/></PrivateRoute>}/>
          <Route path='/showcase' element={<PrivateRoute allowedRoles={["business"]}><ShowcasePage/></PrivateRoute>}/>
          <Route path='/edit/:id' element={<PrivateRoute allowedRoles={["business"]}><EditPage/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    )
}

