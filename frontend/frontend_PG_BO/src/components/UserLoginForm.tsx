import React from 'react';
import styles from "./UserFormStyle.module.css"
//console.log(styles)

import { User } from "../data/UserType";
import { useState } from "react";

interface UserLoginFormProps {
  user?: User;
  onLogin: (user: User) => void;
  onCancel: () => void;
  
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({user, onLogin, onCancel}) => {
    const [username, setUsername] = useState(user?.username ?? "");
    // const [email, setEmail] = useState(user?.email ?? "");
    const [userpassword, setUserpassword] = useState(user?.userpassword ?? "");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        return onLogin({
          ...user,
          username,
          
          userpassword,
        });
      };
     
      return (
        <form className={styles.UserForm} onSubmit={onSubmit}>
          <div className={styles.control}>
            <label htmlFor="name">Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="name"
              id="name"
            />
          </div>
    
    
          <div className={styles.control}>
            <label htmlFor="password">Password:</label>
            <input
              value={userpassword}
              onChange={(e) => setUserpassword(e.target.value)}
              name="password"
              id="password"
            />
          </div>
    
          <div className={styles.buttons}>
            <button type="submit">
              {/* {user ? "Update Data" : "Create Account"} */}
              Login
            </button>
    
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      );

//     return (
//         <form className="UserForm" onSubmit={onSubmit}>
//       <div className="control">
//         <label htmlFor="name">Name:</label>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           name="name"
//           id="name"
//         />
//       </div>
// {/* 
//        <div className="control">
//         <label htmlFor="email">Email:</label>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//           id="email"
//         />
//       </div> */}

//       <div className="control">
//         <label htmlFor="password">Password:</label>
//         <input
//           value={userpassword}
//           onChange={(e) => setUserpassword(e.target.value)}
//           name="password"
//           id="password"
//         />
//       </div>

     
                
//       <div className="buttons">
//         <button className={styles.button} type="submit" >
//           {/* {user ? "Login" : "Register"} */}
//           Login
//         </button>

//         <button className={styles.button} type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//     )
}


// const UserLoginForm: React.FC = () => {

//   return (
//     <div>
//       <h1>User Login Page</h1>
//       <button className={styles.button}>Click me</button>
//     </div>
//   );
// };

export default UserLoginForm;
