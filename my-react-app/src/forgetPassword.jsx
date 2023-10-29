import axios from 'axios';
import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom'


function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState()

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://stockstore12.onrender.com/forget-password', { email});
            navigate('../tables');

            if (response.data.auth) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('auth', JSON.stringify(response.data.auth)); // Store auth data separately if needed


            }
        } catch (error) {
            console.error('Error:', error);
            // Handle authentication error here
        }
    }
    return (
        <div>
            <div className="container2">
                <p> Reset Password</p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    <input type="email" id="form3Example3c" className="form-control" onChange={(e) => setEmail(e.target.value)} />

                    <button type="submit" className="btn5">Login</button>
                </form>
            </div>
        </div>
    )
}
export default ForgetPassword;