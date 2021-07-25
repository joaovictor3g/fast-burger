import { createContext, ReactNode, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
interface ClientContextData {
  clientId: string;
  handleSaveClientId(_clientId: string): void;
  handleSignOut(): void;
}


interface ClientContextProviderProps {
  children: ReactNode;
}

export const ClientContext = createContext({} as ClientContextData);

export function ClientContextProvider({ children }: ClientContextProviderProps) {
  const router = useRouter();
  const [clientId, setClientId] = useState(Cookies.get('client') ?? '');

  function handleSaveClientId(_clientId: string) {
    setClientId(_clientId);
    Cookies.set('client', _clientId);
  }
  
  function handleSignOut() {
    Cookies.remove('client');

    router.push('/')
  }

  return (
    <ClientContext.Provider 
      value={{
        clientId,
        handleSaveClientId,
        handleSignOut
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}