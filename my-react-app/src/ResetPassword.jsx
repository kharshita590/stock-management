import axios from 'axios';
import React, { useState } from 'react';
import "./login.css"
import { useNavigate,useParams } from 'react-router-dom'


function ResetPassword() {
    const {id,token} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState()

     const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('../tables');
        try {
            const response = await axios.post(`https://stockstore2.onrender.com/reset-password/${id}/${token}`, {password});

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

                <label className="form-label" htmlFor="form3Example4c">New Password</label>

        <input type="password" id="form3Example4c" className="form-control" onChange={(e) => setPassword(e.target.value)} />


                    <button type="submit" className="btn5">Update</button>
                </form>
            </div>
        </div>
    )
}
export default ResetPassword;