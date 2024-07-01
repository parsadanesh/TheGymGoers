import { useEffect, useState } from 'react'
import './App.css'

import axios from "axios";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WorkoutForm from './components/WorkoutForm';
import ViewWorkout from './pages/ViewWorkouts';

function App() {
  const [user, setUser] = useState({ email: "", password: "", });
  const [newUser, setNewUser] = useState({ email: "", password: "", });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user.email !== "" || user.password !== "") {
      console.log("user changed", user);
      sendLogin();
    }
  }, [user]);

  useEffect(() => {
    if (newUser.email !== "" || newUser.password !== "") {
      registerUser();
    }
  }, [newUser]);

  const registerUser = async (e) => {
    try {
      const res = await axios.post("http://localhost:3000/addUser", newUser);
      if (res.status === 200) console.log("User Registered");
    } catch (e) {
      console.log(e.response.data.message);
      
    }
  }

  const sendLogin = async (e) => {
      try {
        const res = await axios.post("http://localhost:3000/login", user);
        if (res.status === 200) setLoggedIn(true);
      } catch (e) {
        console.log(e.response.data.message);
      }
  }


  return (
    <div className='container d-flex flex-column' style={{ width: '100%', height: '100vh' }}>
      {/* <WorkoutForm user={user} /> */}
      <Header loggedIn={loggedIn} />
      {loggedIn && (
        <Routes>
          <Route path="/log" element={<WorkoutForm user={user} />} />
          
          <Route path="/viewWorkouts" element={<ViewWorkout user={user} />} />
        </Routes>
                // <>
                //     <p>User is logged in with email: {user.email}</p>
                //     <button onClick={() => setLoggedIn(false)}>Logout</button>
                // </>
      )}
      {!loggedIn && (

        <Routes>
          <Route path="/login" element={ <LoginPage setUser={setUser} setLoggedIn={setLoggedIn} /> } />
          
          <Route path="/sign-up" element={<RegisterPage setNewUser={setNewUser} />} />
          
          

          
          </Routes>
        
      )}
      <Footer />
    </div> 
  )
}

export default App
