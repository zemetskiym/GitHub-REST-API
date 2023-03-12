// Import required modules from React
import { createContext, useContext, useState } from 'react';

// Define a custom type for UserSearch
type UserSearch = {user: string, submitted: boolean}

// Define interface for AppContextProps
interface AppContextProps {
    searchState: [{user: string, submitted: boolean}, React.Dispatch<React.SetStateAction<UserSearch>>]
    userState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
    repoState: [object | null, React.Dispatch<React.SetStateAction<object | null>>];
}

// Create a new context with a default value
const AppContext = createContext<AppContextProps>({
    searchState: [{user: "", submitted: false}, () => null],
    userState: [null, () => null],
    repoState: [null, () => null],
});

// Export a wrapper function for the AppContext provider
export function AppWrapper({ children }: { children: React.ReactNode }) {

    // Set initial states using the useState hook
    const searchState = useState<UserSearch>({user: "", submitted: false})
    const userState = useState<object | null>(null)
    const repoState = useState<object | null>(null)

    // Combine the states into a single object
    const sharedState = {
        searchState,
        userState,
        repoState,
    };

    // Render the AppContext provider with the combined states
    return (
      <AppContext.Provider value={sharedState}>
          {children}
      </AppContext.Provider>
    );
}

// Export a custom hook to consume the AppContext
export function useAppContext() {
    return useContext(AppContext);
}