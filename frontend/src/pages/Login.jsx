import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
    const [Data, setData] = useState({username:"",password:""});
    const history = useNavigate();
    const dispatch = useDispatch();
    const change=(e)=>{
        const {name, value}=e.target;
        setData({...Data, [name]:value});
    };
    const submit = async ()=>{
        try {
            if(Data.username===""||Data.email===""||Data.password===""){
                alert("All fields are required");
            }else{
                const response = await axios.post(
                    "http://localhost:1000/api/v1/log-in", 
                    Data
                );
                setData({username:"", password:""});
                //console.log(response);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                history("/");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div className='flex items-center justify-center h-[98vh]'>
        <div className="p-4 w-2/6 rounded bg-gray-800">
            <div className='text-2xl font-semibold'>Login</div>
            <input 
            type="username" 
            placeholder='username' 
            name="username" 
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
            onChange={change}
            value={Data.username}/>
            <input 
            type="password" 
            placeholder='password' 
            name="password" 
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
            onChange={change}
            value={Data.password}/>
            <div className='w-full flex flex-row justify-between items-center'>
            <button className='bg-blue-400 text-xl font-semibold px-3 py-2 rounded'
            onClick={submit}>Login</button>
            <Link to="/signup" className='text-gray-400 hover:text-gray-200 transition-all duration-300'>Not yet an account? SignUp here</Link>
            </div>
        </div>
    </div>
  )
}

export default Login