import React, { createContext, useState, useMemo, useContext } from 'react';
import type { ReactNode } from 'react';

// Define the shape of your global state
interface IMainState {
  isUserAuthenticated: boolean;
  isAdministrationModule: boolean | null;
  // Add other state properties from the 'data' object
}

// Define the context shape
interface IAppContext {
  mainState: IMainState;
  setMainState: React.Dispatch<React.SetStateAction<IMainState>>;
  // You can add data fetching functions here later
}

// Create the context
const AppContext = createContext<IAppContext | undefined>(undefined);

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mainState, setMainState] = useState<IMainState>({
    isUserAuthenticated: false, // Initially false
    isAdministrationModule: null,
  });

  // Example of a derived value (replaces a 'formula')
  const isUserAuthenticated = useMemo(() => {
    // In a real app, you would have more complex logic here,
    // perhaps checking a session object.
    return mainState.isUserAuthenticated;
  }, [mainState.isUserAuthenticated]);
  
  const value = {
    mainState,
    setMainState,
    // Pass derived values or functions if needed
    isUserAuthenticated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to easily consume the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};