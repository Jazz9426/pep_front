import LoginCompenent from '../forms/login';
import Register from '../forms/register';
import RegisterPet from '../forms/registerPet';
import Pet from '../forms/pet';
import { Routes, Route } from "react-router-dom";
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { User } from '../interfaces/User.interface';
import { stringify } from 'querystring';
import { disconnect } from 'process';
import PetViewer from '../forms/petViewer';
import { API_URL } from '../constants';

Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

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
            <Navbar connected={user!=null} user={user} disconnect={disconnect}/>
            <Routes>
                <Route path="/" />
                <Route path="/login" element={<LoginCompenent changeUser={retrieveUserInfos}/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/registerPet" element={<RegisterPet user={user} jwt={jwt}/>}/>
                <Route path="/pet" element={<Pet connected={user!=null} user={user} jwt={jwt}/>} />
                <Route path="/:userId/:petId" element={<PetViewer user={user} jwt={jwt}/>} />
            </Routes>
      </div>
  );
}


  export default App;
