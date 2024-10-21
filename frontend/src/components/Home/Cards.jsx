import React, { useState } from 'react'
import axios from 'axios';
import {AiFillHeart,AiOutlineHeart, AiFillEdit, AiOutlineDelete,AiOutlinePlus} from 'react-icons/ai';
const Cards = ({home,setInputDiv, data, setUpdatedData}) => {
    //const [ImportantButton, setImportantButton] = useState("Incomplete");
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    };
    const handleUpdate=(id, title, desc)=>{
        setInputDiv("fixed");
        setUpdatedData({id:id, title:title,desc:desc});
    }
    const handleCompleteTask = async (id)=>{
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                {headers});
        } catch (error) {
            console.log(error);
        }
    }
    const handleImportant = async (id)=>{
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-imp-task/${id}`,
                {},
                {headers});

        } catch (error) {
            console.log(error);
        }
    }
    const deleteTask = async (id)=>{
        try {
            const response = await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                {headers});
                console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <div className='grid grid-cols-3 gap-4 p-4'>
        {data && 
        data.map((items,i)=>(
        <div className='bg-gray-600 p-4 rounded-sm flex flex-col justify-between'>
        <div >
            <h3 className='text-xl font-semibold'>{items.title}</h3>
            <p className='text-gray-300 my-2'>{items.desc}</p>
        </div>
        <div className='mt-4 w-full flex items-center'>
            <button
            
            className={`${
                items.complete === false ? "bg-red-400" : "bg-green-400"}
                p-2 rounded w-3/6`}
                onClick={()=>handleCompleteTask(items._id)}>
            {items.complete === true ? "Completed" : "In Completed"}
            </button>
            <div className='w-3/6 p-2 text-xl flex justify-around'>
                <button
                onClick={()=>handleImportant(items._id)}>
                {items.important === false ? <AiOutlineHeart/> : <AiFillHeart className='text-red-500'/>}</button>
                {home!=="false" &&(<button 
                onClick={()=>handleUpdate(items._id, items.title, items.desc)}>
                    <AiFillEdit />
                </button>)}
                <button onClick={()=>deleteTask(items._id)}><AiOutlineDelete /></button>
            </div>
        </div> 
        </div>
        ))}
        {home === "true" && (
            <button 
            className='bg-gray-600 p-4 rounded-sm flex flex-col 
            justify-center items-center hover:scale-105 hover:cursor-pointer 
            transition-all duration-300'
            onClick={()=>setInputDiv("fixed")}>
            <AiOutlinePlus className='text-5xl'/>
            <h2 className='text-2xl mt-4'>Add Task</h2>
        </button>
        )}
        
    </div>
  )
}

export default Cards