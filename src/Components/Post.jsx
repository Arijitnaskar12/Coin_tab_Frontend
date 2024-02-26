import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
const Post = ({openHandler}) => {
    const [posts, setPosts] = useState([]);
    const[toggle,setToggle]=useState(true);
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const obj={
    id:openHandler?.id
}
     useEffect(() => {
         axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${openHandler.id}`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    },[]);
    useEffect(()=>{
        axios.post(`${backendUrl}/checkId`,obj)
        .then((response)=>{
            if(response.data.data===true)
            {
                setToggle(false);
            }else{
                setToggle(true );
            }
        })
    },[])
    const handleBulkadd =() => {
        setToggle(false);
        axios.post(`${backendUrl}/addPost`,posts)
        .then((response)=>{
            alert(response.data.message);
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const handleDownload=()=>{
       axios.post(`${backendUrl}/download`,obj,{
        responseType:'blob'
       })
       .then((response)=>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = `userid${openHandler.id}`;
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch.length === 2)
                fileName = fileNameMatch[1];
        }
        FileSaver.saveAs(response.data, fileName);
       })
       .catch((e)=>{
        console.log(e);
       })
    }
    return (
        <div className='postpage'>
        <div className='userBtn'>
        {
            toggle?
        <button className='comnBtn' onClick={handleBulkadd}>Bulk Add</button>:
        <button className='comnBtn' onClick={handleDownload}>Download in Excel</button>
        }

        </div>
            <div className='usersCard'>
                {
                    posts?.map((post) => (
                        <div className='postInfo' key={post.id}>
                            <h4>Name: {openHandler.name}</h4>
                            <h4>Title: {post.title}</h4>
                            <h4>Body: {post.body}</h4>
                            <h4>Company Name: {openHandler.company.name}</h4>
                        </div>
                    ))
            }
           
        </div>
            </div>
    )
 }
export default Post;
