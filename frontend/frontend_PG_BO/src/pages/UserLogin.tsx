import React, {useState} from 'react';
import UserLoginForm from '../components/UserLoginForm';


import { User } from "../data/UserType";
import { useNavigate } from "react-router-dom";

import {useUserContext} from "../UserContext.tsx";
//import {authenticate} from "../ApiComm.tsx";

const fetchSession = (): Promise<Response> => {
    return fetch("http://localhost:8080/api/session", {
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
    const {user, setUser} = useUserContext();
    console.log("userFromLogin: " + user)
    const navigate = useNavigate();

    const handleLoginUser = (user: User) => {
            loginUser(user)
            .then(() => {
                navigate("/info")
            })

        fetchSession().then(res => res.json().then(data =>{console.log("data: " + data);return  setUser(data)}))

    }

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

    /*const handleLoginUser = async (user: User) => {
        dispatch({ type: "authenticate" });

        try {
            await loginUser(user);
            const currentUser = await authenticate(user);
            console.log("currentUser: " + currentUser)
            dispatch({ type: "authenticated", user: currentUser });
            navigate("/info");
        } catch (error) {
            // Handle errors here
        }
    };*/




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
