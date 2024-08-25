import { useEffect, useState } from "react"
import "./GetUser.scss"

function GetUser(){
    const [users, setUsers] = useState([])

    useEffect(() =>{
       fetch('http://127.0.0.1:8000/api/v2/products/users/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
       }).then(response => response.json())
       .then(data => {
           setUsers(data.results)           
       })
    } ,[])
    
    
    return (
        <div className="getusers">
            <h1>Get Users</h1>
            <div className="blockgetusers">
                {users.map(user => (
                    <div key={user.id} className="user">
                        <h2>Username: {user.username}</h2>
                        <p>First Name: {user.first_name}</p>
                        <p>LastName: {user.last_name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default GetUser