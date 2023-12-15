import React from 'react';
import styles from "./Style.module.css"
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
                <label className={styles.label} htmlFor="name">Username:</label>
                <input className={styles.input}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       name="name"
                       id="name"
                />
            </div>


            <div className={styles.control}>
                <label className={styles.label} htmlFor="password">Password:</label>
                <input className={styles.input}
                       value={userpassword}
                       onChange={(e) => setUserpassword(e.target.value)}
                       name="password"
                       id="password"
                />
            </div>

            <div className={styles.buttons}>
                <button className={styles.button} type="submit">
                    {/* {user ? "Update Data" : "Create Account"} */}
                    Login
                </button>

                <button className={styles.button} type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
export default UserLoginForm;
