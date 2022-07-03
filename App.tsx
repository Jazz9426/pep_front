import LoginCompenent from './login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <div>
          <Routes>
              <Route path="/login" element={<LoginCompenent/>} />
              <Route path="/register" element={<LoginCompenent/>} />
              <Route path="/registerPet" element={<LoginCompenent/>} />
          </Routes>
      </div>
  );
}


export default App;
