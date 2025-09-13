import { AuthProvider, useAuth } from './context/AuthContext';

import CustomerApp from './customer/CustomerApp';
import BusinessApp from './business/BusinessApp';

const ChooseApp = () => {
  const { userType } = useAuth();
  return userType === 'customer' ? <CustomerApp /> : <BusinessApp />;
}

function App() {
  return (
    <AuthProvider>
      <ChooseApp />
    </AuthProvider>
  )
}

export default App
