import React from "react";

const AdminSpace: React.FC = (handleShowUsers) => {
    return (
        <div>
            <button onClick={handleShowUsers}>Show User List</button>
        </div>
    )
}
export default AdminSpace;