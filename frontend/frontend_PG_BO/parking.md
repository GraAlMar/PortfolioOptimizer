

,{method: "GET", credentials: "include",headers: {"Content-Type":"application/json"}}
===============================================
UserContext.tsx:

type State = {
user: undefined | User,
permissions: undefined | string[],
loading: boolean,
};

const initialState = {
user: undefined,
permissions: undefined,
loading: false,
};
type Action =
| {
type: "authenticate",
}
| {
type: "authenticated",
user: User | undefined,
}
| {
type: "authotize",
}
| {
type: "authorized",
permissions: string[],
};

function reducer(state: State, action: Action): State {
switch (action.type) {
case "authenticate":
return {...state, loading: true};
case "authenticated":
return {...state, loading: false, user: action.user};
case "authotize":
return {...state, loading: true};
case "authorized":
return {...state, loading: false, permissions: action.permissions};
default:
return state;
}
};

type UserContextType = State & {
dispatch: React.Dispatch<Action>
};

const UserContext = createContext<UserContextType>({
...initialState,
dispatch: () => {}
});
type UserProviderProps = {
children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {

    const [{user, permissions, loading}, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider
            value={{
                user,
                permissions,
                loading,
                dispatch
            }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserContext = () => useContext(UserContext);

-------------------------------------
UserLogin.tsx:


    /*const handleLoginUser = (user: User) => {
        dispatch({ type: "authenticate" });

        loginUser(user)
            .then(() => {
                navigate("/info");
                return authenticate();
            })
            .then(currentUser => {
                console.log("currentUser: " + currentUser)
                dispatch({ type: "authenticated", user: currentUser });
            })
            /!*.catch(error => {

            });*!/

    };*/

    const handleLoginUser = async (user: User) => {
        dispatch({ type: "authenticate" });

        try {
            await loginUser(user);
            const currentUser = await authenticate(user);
            console.log("currentUser: " + currentUser)
            dispatch({ type: "authenticated", user: currentUser });
            navigate("/info");
        } catch (error) {
            
        }
    };



==============================================
//useEffect(() => {
//	fetchAssetsByName(setAssets, userInstantInput);
//}, [userInstantInput]);

//const handleChange = (e) => { 
//	setUserInstantInput(e.target.value);
//};