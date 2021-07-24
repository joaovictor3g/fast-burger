import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ClientContextData {
  clientId: string;
  handleSaveClientId(_clientId: string): void;
}


interface ClientContextProviderProps {
  children: ReactNode;
}

export const ClientContext = createContext({} as ClientContextData);

export function ClientContextProvider({ children }: ClientContextProviderProps) {
  const [clientId, setClientId] = useState('');

  function handleSaveClientId(_clientId: string) {
    setClientId(_clientId);
  }
  
  return (
    <ClientContext.Provider 
      value={{
        clientId,
        handleSaveClientId
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}