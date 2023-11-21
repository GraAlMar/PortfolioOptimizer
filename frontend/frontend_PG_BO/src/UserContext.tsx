import React, {createContext, useContext,  ReactNode, useState} from "react";
import {User} from "./data/UserType.tsx";

type UserContextType = {user: User;
    setUser: React.Dispatch<React.SetStateAction<User>> | ((user: User) => void);
};

const emptyUser: User = {username: ""}
/*const UserContext = createContext<UserContextType>(undefined)
type UserProviderProps = {
    children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<undefined | User>()
    const value = {user, setUser}
    return (
        <UserContext.Provider
            value={value}>
            {children}
        </UserContext.Provider>
    )
}*/

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);