import React from 'react';
import UserLoginForm from '../components/UserLoginForm';


import { User } from "../data/UserType";
import { useNavigate } from "react-router-dom";

import {useAppContext} from "../AppContext.tsx";
//import {authenticate} from "../ApiComm.tsx";

const fetchSession = (): Promise<Response> => {
    return fetch("http://localhost:8080/api/auth/session", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    });
}

const loginUser = (user: User) => {

    const response =  fetch("http://localhost:8080/api/auth/signin", {

      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
        .then((res) => res.json());
    
    return response;
    
  };

const UserLogin: React.FC = () => {
    //const [user,setUser] = useState<User>()
    const {user, setUser} = useAppContext();
    console.log("user at initial render of LoginPage: " + user)
    const navigate = useNavigate();

    const handleLoginUser = (user: User) => {
            loginUser(user)
            .then(() => {
                navigate("/info")
            })

        fetchSession().then(res => res.json().then(data =>{console.log("data from fetchSession at login: " + data); setUser(data)}))
    }

    return (
        <div>
            <UserLoginForm
                
                onCancel={() => navigate("/")}
                onLogin={handleLoginUser}
            />
        </div>
    )
}
export default UserLogin;
