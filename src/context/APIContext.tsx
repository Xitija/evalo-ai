import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface APIContextType {
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
}

// Create the context with a default value
const ApiContext = createContext<APIContextType | undefined>(undefined);

// Provider component
export const APIProvider: React.FC<{ children: ReactNode }> = ({ children }): React.ReactElement => {
  // Get the API base URL from an environment variable or use a default value
  const [apiBaseUrl, setApiBaseUrl] = useState<string>(
    import.meta.env.VITE_API_BASE_URL || 'https://default-api-url.com'
  );
  console.log('API Base URL:', apiBaseUrl); // Log the API base URL for debugging
  return (
    <ApiContext.Provider value={{ apiBaseUrl, setApiBaseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the APIContext
export const useAPIContext = (): APIContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useAPIContext must be used within an APIProvider');
  }
  return context;
};
