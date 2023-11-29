import React from "react";
import {useUserContext} from "../UserContext.tsx";

//const AdminSpace: React.FC = (handleShowUsers) => {
const AdminSpace: React.FC = () => {
    const {user} = useUserContext();
    console.log(user)
    return (
        <div>
            {user && user.roles.includes("ROLE_ADMIN") ? (<div>hello</div>) : (<div>piss off</div>)}
            {/* <button onClick={handleShowUsers}>Show User List</button> */}
        </div>
    )
}
export default AdminSpace;