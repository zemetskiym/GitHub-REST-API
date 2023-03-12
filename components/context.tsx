import { createContext, useContext, useState } from 'react';

interface AppContextProps {
    userState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
    repoState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
}

const AppContext = createContext<AppContextProps>({
    userState: [null, () => null],
    repoState: [null, () => null],
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const userState = useState<object | null>(null)
    const repoState = useState<object | null>(null)

    const sharedState = {
        userState,
        repoState,
    };

    if (sharedState === undefined) {
        throw new Error('AppContextProvider must be used with an AppContextProvider');
    }

    return (
      <AppContext.Provider value={sharedState}>
          {children}
      </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}