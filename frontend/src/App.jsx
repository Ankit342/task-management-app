import React,{useEffect} from 'react'
import Home from './pages/Home';
import { Routes, Route, useNavigate } from  'react-router-dom';
import AllTask from './pages/AllTask';
import ImpTask from './pages/ImpTask';
import IncompTask from './pages/IncompTask';
import CompTask from './pages/CompTask';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }else if(isLoggedIn===false){
      navigate("/login");
    }
  }, []);
  
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      
        <Routes>
          <Route exact path="/" element={<Home/>}>
            <Route index element={<AllTask/>}/>
            <Route path='/importantTasks' element={<ImpTask/>}/>
            <Route path='/completedTasks' element={<CompTask/>}/>
            <Route path='/incompletedTasks' element={<IncompTask/>}/>
          </Route>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      
    </div>
  )
}

export default App;