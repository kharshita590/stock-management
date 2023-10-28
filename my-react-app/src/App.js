import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import Login from './Login';
import Tables from './Tables';
import { Homepage } from './Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/tables" element={<Tables/>}/>
        <Route path ="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
