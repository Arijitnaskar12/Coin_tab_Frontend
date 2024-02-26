import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Home = ({ setToggle, toggle,setAddedUsers,addedUsers,setOpenHandler }) => {
    const [users, setUsers] = useState([]);
    
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   useEffect(()=>{
    axios.get(`${backendUrl}/getData`)
    .then((response)=>{
        setAddedUsers(response.data.data);
    })
    .catch((e)=>{
        console.log(e);
    })
   },[]);
    const handleUser = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const handleOpen = (user) => {
        setToggle(!toggle);
        setOpenHandler(user);
    }

    const handleAdd = (user) => {
        const saveObj={
            id:user.id,
            name:user.name,
            username:user.username,
            phone:user.phone,
            website:user.website,
            address:JSON.stringify(user.address),
            company:JSON.stringify(user.company),
            email:user.email
        };
        axios.post(`${backendUrl}/addData`,saveObj)
        .then((response)=>{
            alert(response.data.message);
        })
        .catch((e)=>{
            console.log(e);
        })
        setAddedUsers([...addedUsers, {id:user.id}]);
    }
    return (
        <div className='homePage'>
        <div className="userBtn">
            <button type='button' className='comnBtn' onClick={handleUser}>All Users</button>
        </div>
            <div className='usersCard'>
                {
                    users?.map((user) => (
                        <div className='userInfo' key={user.id}>
                            <h4>Name: {user.name}</h4>
                            <h4>Email: {user.email}</h4>
                            <h4>Phone: {user.phone}</h4>
                            <h4>Website: {user.website}</h4>
                            <h4>City: {user.address.city}</h4>
                            <h4>Company Name: {user.company.name}</h4>
                            <div className='btnC'>
                                {addedUsers.find(addedUser => addedUser.id ===user.id) ? (
                                    <button type='button' className='comnBtn' onClick={() => handleOpen(user)}>Open</button>
                                ) : (
                                    <button type='button' className='comnBtn' onClick={() => handleAdd(user)}>Add</button>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;
