import {User} from "./data/UserType.tsx";
import React from "react";


/*
export const authenticate: React.FC<User | undefined> = () => {
    return fetch("http://localhost:8080/api/session", {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    }).then(response => {if (response.ok) {return response.json} throw new Error()});
}*/
/*export const authenticate = (): Promise<User | undefined> => {
    const response =  fetch("http://localhost:8080/api/session", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Authentication failed");
        });
    console.log("response: "+ response)
    return response;
};*/
/*export const authenticate = async (user: User): Promise<User | undefined> => {
    try {
        const response = await fetch("http://localhost:8080/api/session", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const userData = await response.json();
            console.log("userData: " + userData)
            return userData; // Return the resolved user data
        }
        throw new Error("Authentication failed");
    } catch (error) {
        throw new Error("Authentication failed");
    }
};*/
