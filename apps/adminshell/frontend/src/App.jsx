import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersPage from './pages/OrdersPage';
import ShipmentsPage from './pages/ShipmentsPage';
import ProfitPage from './pages/ProfitPage';
import GiftCardPage from './pages/GiftCardPage';
import AdminNav from './components/AdminNav';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/*" element={
            <PrivateRoute allowedRoles={["base", "super"]}>
              <div className="flex">
                <AdminNav />
                <main className="flex-1 min-h-screen bg-gray-50">
                  <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/products" element={<ProductsPage />}/>
                    <Route path="/products/:id" element={<ProductDetailsPage />}/>
                    <Route path="/orders" element={<OrdersPage />}/>
                    <Route path="/shipments" element={<ShipmentsPage />}/>
                    <Route path="/profit" element={<PrivateRoute allowedRoles={["super"]}><ProfitPage /></PrivateRoute>}/>
                    <Route path="/giftcard" element={<PrivateRoute allowedRoles={["super"]}><GiftCardPage /></PrivateRoute>}/>
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App