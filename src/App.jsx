import React, { useState } from 'react'
import Home from './Components/Home'
import Post from './Components/Post'

const App = () => {
  const[toggle,setToggle]=useState(false);
  const[openHandler,setOpenHandler]=useState();
  const [addedUsers, setAddedUsers] = useState([]);
  return (
    <div className='main'>
    <h1 className='heading'>Cointab SE-ASSIGNMENT</h1>
    {
      !toggle?
    <Home setToggle={setToggle} toggle={toggle} setAddedUsers={setAddedUsers} addedUsers={addedUsers} setOpenHandler={setOpenHandler}/>:
    <Post openHandler={openHandler}/>
    }

    </div>
  )
}

export default App;