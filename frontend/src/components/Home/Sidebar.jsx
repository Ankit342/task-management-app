import React,{useEffect, useState} from 'react'
import { AiFillBook,AiFillCloseSquare,AiFillCarryOut,AiFillProfile } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

function Sidebar() {
    const [Data, setData] = useState()
    const dispatch = useDispatch();
    const history = useNavigate();
    const data = [
        {
            title:"All tasks",
            icon: <AiFillProfile />,
            link: "/"
        },
        {
            title:"Important tasks",
            icon: <AiFillBook />,
            link: "/importantTasks"
        },
        {
            title:"Completed tasks",
            icon: <AiFillCarryOut />,
            link:"/completedTasks"
        },
        {
            title:"Incompleted tasks",
            icon: <AiFillCloseSquare />,
            link:"incompletedTasks"
        },
    ]
    const logout=()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/login");
    };
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
      const fetch = async()=>{
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
        setData(response.data.data);
      };
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
    }
    }, [])
    
  return (
    <>
        {Data && (
        <div>
            <h2 className='text-xl font-bold'>{Data.username}</h2>
            <h4 className='my-2 text-gray-400'>{Data.email}</h4>
            <hr />
        </div>
        )}
        <div>
            {data.map((items,i)=>(
                <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all'>
                    <span className='text-xl'>
                        {items.icon}
                    </span>
                    &nbsp;{items.title}
                </Link>
            ))}
        </div>
        <div>
            <button className='bg-gray-600 w-full p-2 rounded'
            onClick={logout}>Log Out</button>
        </div>
    </>
  )
}

export default Sidebar