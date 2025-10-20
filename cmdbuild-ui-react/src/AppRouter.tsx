import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './state/AppContext'; // Your context hook
import type { JSX } from 'react';

// Import your page components (you'll create these)
import LoginPage from './pages/LoginPage';
import AdministrationPage from './pages/AdminstrationPage';
import MainLayout from './components/MainLayout';

// A wrapper for routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isUserAuthenticated  = useAppContext().mainState.isUserAuthenticated;
  
  if (!isUserAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to.
    return <Navigate to="/login" replace />;
  }

  return children;
};

// A wrapper for routes that require admin access (replicates 'before: adminAccess')
const AdminRoute = ({ children }: { children: JSX.Element }) => {
    // You would add logic here to check for admin privileges from your context
    const isAdmin = true; // Replace with real logic
    if (!isAdmin) {
        return <Navigate to="/administration/home" replace />; // or an unauthorized page
    }
    return children;
}


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that use the main layout (header, etc.) */}
        <Route element={<MainLayout />}>
           
            {/* Example of translating 'administration' routes with a guard */}
            <Route 
                path="/administration/home" 
                element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdministrationPage />
                        </AdminRoute>
                    </ProtectedRoute>
                } 
            />
            {/* ... Add all other routes here */}
        </Route>
        
        {/* Routes that do not use the main layout */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;