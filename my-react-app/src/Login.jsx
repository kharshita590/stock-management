import axios from 'axios';
import React, {useState} from 'react';
import "./login.css"
import {useNavigate,Link } from 'react-router-dom'


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
    const response = await axios.post('https://stock-store-api.vercel.app/login', { email, password },{withCredentials:true});
    navigate('../tables');
    console.log(response);

  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('auth', JSON.stringify(response.data.token)); // Store auth data separately if needed


  }
} catch (error) {
  console.error('Error:', error);
  // Handle authentication error here
}
  }
  return (
    <div>
        <div className="container2">
          <p>Login</p>
      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
        <input type="email" id="form3Example3c" className="form-control" onChange={(e) => setEmail(e.target.value)} />

        <label className="form-label" htmlFor="form3Example4c">Password</label>
        <Link to = "/forget-Password">Forgot Password</Link>
        <input type="password" id="form3Example4c" className="form-control" onChange={(e) => setPassword(e.target.value)} />


        <button type="submit"className="btn5">Login</button>
      </form>
     </div>
    </div>
  )
}
export default Login;