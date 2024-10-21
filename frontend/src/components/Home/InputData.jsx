import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
const InputData = ({InputDiv, setInputDiv, UpdatedData, setUpdatedData}) => {
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    };
    const [Data, setData] = useState({title:"", desc:""});
    useEffect(() => {
      setData({title:UpdatedData.title,desc:UpdatedData.desc})
    }, [UpdatedData])
    
    const change=(e)=>{
        const {name, value} = e.target;
        setData({...Data, [name]:value});
    }
    const submitData = async () => {
        if(Data.title ===""|| Data.desc===""){
            alert("All fields are required");
        }else{
            await axios.post("http://localhost:1000/api/v2/create-task", Data,{headers});
        setData({title:"", desc:""});
        setInputDiv("hidden");
        }

    }
    const UpdateTask = async () => {
        if(Data.title ===""|| Data.desc===""){
            alert("All fields are required");
        }else{
            await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`, Data,{headers});
            setUpdatedData({id:"",title:"", desc:""})
            setData({title:"", desc:""});
            setInputDiv("hidden");
        }

    }
  return (
    <>
    <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
    <div className={`${InputDiv} top-0 left-0 flex items-center h-screen w-full justify-center`}>
        
        <div className="w-3/6 bg-gray-900 p-4 rounded">
        <div className='flex justify-end items-end'>
            <button onClick={()=> {setInputDiv("hidden")
                setData({title:"", desc:""}) 
                setUpdatedData({id:"",title:"", desc:""})
            }}><AiOutlineClose/></button>
        </div>
        <input type="text" 
        name="title" 
        placeholder='Title' 
        className='px-3 py-2 rounded w-full bg-gray-700 my-3'
        value={Data.title}
        onChange={change}/>
        <textarea 
        name="desc" 
        id="" cols="30" 
        rows="10" 
        placeholder='Description' 
        className='px-3 py-2 rounded w-full bg-gray-700 my-3'
        value={Data.desc}
        onChange={change}></textarea>
        {UpdatedData.id===""?<button className='px-3 py-2 bg-blue-400 rounded'
        onClick={submitData}>Submit</button>:<button className='px-3 py-2 bg-blue-400 rounded'
        onClick={UpdateTask}>Update</button>}
        
        
        </div>
    </div>
    </>
  )
}

export default InputData