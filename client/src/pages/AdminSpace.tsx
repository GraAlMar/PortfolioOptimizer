import React, {useEffect, useState} from "react";
import {useAppContext} from "../AppContext.tsx";
import {User} from "../data/UserType.tsx";
import styles from "../components/Style.module.css"
import UserListTable from "../components/UserListTable.tsx";

async function fetchDeleteUser(userid: number,stateSetter: React.Dispatch<React.SetStateAction<User[]>>) {
    console.log(userid)
    await fetch(`http://localhost:8080/api/users/${userid}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }

    })
    await fetchUsers(stateSetter)

}
const fetchUsers = (stateSetter: React.Dispatch<React.SetStateAction<User[]>>): Promise<void> => {
    return fetch("http://localhost:8080/api/admin/users", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    })
        .then(res => res.json().then(data => stateSetter(data)));
}


//const AdminSpace: React.FC = (handleShowUsers) => {
const AdminSpace: React.FC = () => {
    const {user} = useAppContext();
    const [usersVisible,setUsersVisible] = useState<boolean>(false)
    const [usersList, setUsersList] = useState<User[]>([])
    console.log("user: " + user)
    console.log(usersVisible)

    function handleDeleteUser(id) {
        return fetchDeleteUser(id,setUsersList);
    }

    function handleShowUsers() {

        if (!usersVisible) {
            setUsersVisible(true)
            return fetchUsers(setUsersList);
        } else {
            setUsersVisible(false)
        }

    }
    useEffect(() => {
        fetchUsers(setUsersList);
        console.log("useEffect-users: " + user)
    }, [])
    //console.log(user.roles)

    return (
        <div>
            <>

                {user && user.roles.some(role => role["name"] === "ROLE_ADMIN") ? (
                    <>
                        <div>hallo</div>
                        <div><p></p></div>
                        <button type="button" className={styles.button}
                                onClick={handleShowUsers}>{!usersVisible ? "Show User List" : "Hide User List"}</button>

                        {usersVisible && usersList ?
                            <UserListTable users={usersList} onDelete={handleDeleteUser}/> : null}</>
                ) : (<div>piss off</div>)}
            </>

            {/* <button onClick={handleShowUsers}>Show User List</button> */}

        </div>
    )
}
export default AdminSpace;