import React from "react";
import UserRegistrationForm from "../components/UserRegistrationForm";
import { User } from "../data/UserType";
import { useNavigate } from "react-router-dom";



const createUser = (user: User) => {
    console.log(user)
    return fetch("http://localhost:8080/api/auth/signup", {
    // return fetch("http://localhost:8080/api/users", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
    
  };

const UserRegistration: React.FC = () => {
    
    const navigate = useNavigate();

    const handleCreateUser = (user: User) => {
            createUser(user)
            .then(() => {
                navigate("/info")
            })
            console.log(user)
    }


    return (
        <div>
            <UserRegistrationForm
                
                onCancel={() => navigate("/")}
                onSave={handleCreateUser}
            />
        </div>
    )
}

export default UserRegistration;