import React, {useEffect} from "react";
import {useUserContext} from "../UserContext.tsx";


const fetchSession = (): Promise<Response> => {
    return fetch("http://localhost:8080/api/auth/session", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    });
}



const InfoPage: React.FC = () => {
    const {user, setUser} = useUserContext()

    const checkSession = () => {
        fetchSession()
            .then(res => res.json())
            .then(data => {console.log("InfoPage: checkSession data: " + data); setUser(data)})

    };
    useEffect(() => {
        checkSession();

    }, []);

    return (
        <div>
            <p>PROCESS SUCCESSFUL</p>
        </div>
    )
}
export default InfoPage;