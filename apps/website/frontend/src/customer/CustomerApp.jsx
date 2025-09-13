import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomerNav from './components/CustomerNav';

import PrivateRoute from '../context/PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from '../shared/pages/LoginPage';
import RegisterPage from '../shared/pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import BalancePage from './pages/BalancePage';
import OrdersPage from './pages/OrdersPage';
import AddressesPage from './pages/AddressesPage';
import SupportPage from './pages/SupportPage';
import ProductPage from './pages/ProductPage';

export default function CustomerApp() {
    return (
      <BrowserRouter>
        <CustomerNav />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/cart' element={<PrivateRoute allowedRoles={["customer"]}><CartPage/></PrivateRoute>}/>
          <Route path='/checkout' element={<PrivateRoute allowedRoles={["customer"]}><CheckoutPage/></PrivateRoute>}/>
          <Route path='/profile' element={<PrivateRoute allowedRoles={["customer"]}><ProfilePage/></PrivateRoute>}/>
          <Route path='/balance' element={<PrivateRoute allowedRoles={["customer"]}><BalancePage/></PrivateRoute>}/>
          <Route path='/my-orders' element={<PrivateRoute allowedRoles={["customer"]}><OrdersPage/></PrivateRoute>}/>
          <Route path='/ship-addresses' element={<PrivateRoute allowedRoles={["customer"]}><AddressesPage/></PrivateRoute>}/>
          <Route path='/support' element={<PrivateRoute allowedRoles={["customer"]}><SupportPage/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    )
}

