import React, {createContext, useContext, ReactNode, useState, Context} from "react";
import {User} from "./data/UserType.tsx";
import {Asset} from "./data/AssetType.tsx";

type AppContextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    shortList: Asset[] | [];
    setShortList: React.Dispatch<React.SetStateAction<Asset[]>>;

};
const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User |  undefined>(undefined);
    const [language, setLanguage] = useState("German")
    const [shortList,setShortList] = useState<Asset[]>([])

    return (
        <AppContext.Provider value={{ user, setUser ,language,setLanguage, shortList, setShortList}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext<AppContextType>(AppContext  as Context<AppContextType>);