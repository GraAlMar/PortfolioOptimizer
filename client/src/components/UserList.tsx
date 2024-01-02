import React from "react";
import { User } from "../data/UserType";
import 

const renderList = (list: User[] | User) => {
   
    const arrayList = Array.isArray(list) ? list : [list];
    
    return arrayList ? (
        <div className="UserTable">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>{
                    arrayList.map((item: User, index: number) => {
                        return <UserListItem key={index} item={item} /*onSelect={} onSave={}*//> })} 
                </tbody>
            </table>
        </div>
        
        
        
    
    
    ) : (
		<p> loading... </p>
	)
}


const UserList: React.FC = () => {
    return (
        <div>
            {renderList(users)}
        </div>
    )
}
export default UserList;