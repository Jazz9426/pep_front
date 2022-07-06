import LoginCompenent from '../forms/login';
import Register from '../forms/register';
import RegisterPet from '../forms/registerPet';
import Pet from '../forms/pet';
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { User } from '../interfaces/User.interface';
import PetViewer from '../forms/petViewer';
import { API_URL } from '../constants';
import Home from '../forms/home';

Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

function Page({user, disconnectClbk, component} : {user : User | null, disconnectClbk : () => void, component : JSX.Element}) {
  const page = useLocation()
  return (
    <>
      <Navbar connected={user!=null} activePage={page.pathname} user={user} disconnect={disconnectClbk}/>
      {component}
    </>
  )
}

function App() {
  const retrievedJWT = window.sessionStorage.getItem("jwt")
  const [jwt, setJwt] = useState(retrievedJWT ? JSON.parse(retrievedJWT) : "")

  const retrievedUserId = window.sessionStorage.getItem("userId")
  const [userId, setUserId] = useState(retrievedUserId ? JSON.parse(retrievedUserId) : 0)

  const retrievedUser = window.sessionStorage.getItem("user")
  const [user, setUser] = useState<User|null>(retrievedUser ? JSON.parse(retrievedUser) : null)

  useEffect(() => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    window.sessionStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  useEffect(() => {
    window.sessionStorage.setItem("jwt", JSON.stringify(jwt));
  }, [jwt]);

  function disconnect () {
    setJwt("")
    setUserId(0)
    setUser(null)
  }

  function retrieveUserInfos(jwt : string, userId : number){
    setJwt(jwt)
    setUserId(userId)
    Axios.get(`${API_URL}/user?id=${userId}`, {
      headers: {
        'authorization': jwt
      }})
      .then((response) => {
        let newUser : User = {
          firstName : response.data.firstName,
          lastName : response.data.lastName,
          email : response.data.email,
          id : userId,
        }
        setUser(newUser)
      })
  }

  return (
      <div>
            <Routes>
                <Route path="/" element={<Page user={user} disconnectClbk={disconnect} component={<Home/>}/>}/>
                <Route path="/login" element={<Page user={user} disconnectClbk={disconnect} component={<LoginCompenent changeUser={retrieveUserInfos}/>}/>} />
                <Route path="/register" element={<Page user={user} disconnectClbk={disconnect} component={<Register/>} />} />
                <Route path="/registerPet" element={<Page user={user} disconnectClbk={disconnect} component={<RegisterPet user={user} jwt={jwt}/>}/>}/>
                <Route path="/pet" element={<Page user={user} disconnectClbk={disconnect} component={<Pet connected={user!=null} user={user} jwt={jwt}/>}/>} />
                <Route path="/:userId/:petId" element={<Page user={user} disconnectClbk={disconnect} component={<PetViewer user={user} jwt={jwt}/>}/>} />
            </Routes>
      </div>
  );
}


  export default App;
