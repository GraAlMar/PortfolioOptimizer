import React from 'react';
import UserLoginForm from '../components/UserLoginForm';


import { User } from "../data/UserType";
import { useNavigate } from "react-router-dom";



const loginUser = (user: User) => {
    console.log(user)
    return fetch("http://localhost:8080/api/auth/signin", {
      credentials: 'include',
    // return fetch("http://localhost:8080/api/users", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
    
  };

const UserLogin: React.FC = () => {
    
    const navigate = useNavigate();

    const handleLoginUser = (user: User) => {
            loginUser(user)
            .then(() => {
                navigate("/info")
            })
            console.log(user)
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

// const UserLogin: React.FC = () => {
//   return (
//     <div>
//       <UserLoginForm />
//     </div>
//   );
// };

export default UserLogin;
