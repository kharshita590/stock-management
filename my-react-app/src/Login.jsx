import axios from 'axios';
import React,{useState,Link} from 'react'




function Login(){
    const[email,setEmail] = useState()
  const[password,setPassword] = useState()
    const handleSubmit=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:3001/login',{email,password:password})
      .then(result=>console.log(result
        ).catch(err=> console.log(err)))
    }
    return(
        <div>
            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
              <input type="email" id="form3Example3c" className="form-control"  onChange ={(e)=>setEmail(e.targetvalue)} />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>

                      <input type="password" id="form3Example4c" className="form-control"  onChange ={(e)=>setPassword(e.targetvalue)}/>
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                      <Link to="./login" className="btn btn-primary">Login</Link>
   </form>

        </div>
    )


}
export default Login;