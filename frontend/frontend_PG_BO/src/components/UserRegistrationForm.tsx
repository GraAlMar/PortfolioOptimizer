import React from "react";
import { useState } from "react";
import { UserRegistrationFormProps } from "../data/UserRegistrationFormProps";



const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({user, onSave, onCancel}) => {
    const [username, setUsername] = useState(user?.username ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [userpassword, setUserpassword] = useState(user?.userpassword ?? "");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        return onSave({
          ...user,
          username,
          email,
          userpassword,
        });
      };
      

    return (
        <form className="UserForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="name"
          id="name"
        />
      </div>

       <div className="control">
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>

     
                
      <div className="buttons">
        <button type="submit" >
          {user ? "Update Data" : "Create Account"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
    )
}

export default UserRegistrationForm;