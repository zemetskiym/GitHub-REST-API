import { createContext, useContext, useState } from 'react';

type UserSearch = {user: string, submitted: boolean}

interface AppContextProps {
    searchState: [{user: string, submitted: boolean}, React.Dispatch<React.SetStateAction<UserSearch>>]
    userState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
    repoState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
}

const AppContext = createContext<AppContextProps>({
    searchState: [{user: "", submitted: false}, () => null],
    userState: [null, () => null],
    repoState: [null, () => null],
});

export function AppWrapper({ children }: { children: React.ReactNode }) {

    const searchState = useState<UserSearch>({user: "", submitted: false})
    const userState = useState<object | null>(null)
    const repoState = useState<object | null>(null)

    const sharedState = {
        searchState,
        userState,
        repoState,
    };

    return (
      <AppContext.Provider value={sharedState}>
          {children}
      </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}