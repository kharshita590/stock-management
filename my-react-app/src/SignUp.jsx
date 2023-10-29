import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign.css';

function SignUp() {
  const navigate = useNavigate('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://stockstore.onrender.com/register', { name, username, email, password: password })
      .then(result => {
        console.log(result)
        navigate('../login')
      })
      .catch(err => console.log(err))

  }
  return (

   <div className="container1">
    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
    <p>Sign Up</p>

      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
      <input type="text" id="form3Example1c" className="form-control"
        onChange={(e) => setName(e.target.value)} />

      <label className="form-label" htmlFor="form3Example1c"> Username</label>
      <input type="text" id="form3Example1c" className="form-control"
        onChange={(e) => setUsername(e.target.value)} />



      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
      <input type="email" id="form3Example3c" className="form-control" onChange={(e) => setEmail(e.target.value)} />

      <label className="form-label" htmlFor="form3Example4c" >Password</label>
      <input type="password" id="form3Example4c" className="form-control" onChange={(e) => setPassword(e.target.value)}/>

      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
      <input type="password" id="form3Example4cd" className="form-control"  />

     <div class="content">
      <button type="submit" onClick={handleSubmit} className="btn3">Register</button>

      <button type="submit" className="btn4">Login</button>
      </div>

    </form>
    </div>


  )
}
export default SignUp;