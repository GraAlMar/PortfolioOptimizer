import React from 'react';
import styles from "./UserLoginFormStyle.module.css"
console.log(styles)

const UserLoginForm: React.FC = () => {
  return (
    <div>
      <h1>User Login Page</h1>
      <button className={styles.button}>Click me</button>
    </div>
  );
};

export default UserLoginForm;
