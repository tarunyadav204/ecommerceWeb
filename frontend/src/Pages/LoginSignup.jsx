import React, { useState } from 'react'
import './CSS/LoginSignup.css'
function LoginSignup() {

  const [state,setState] = useState("Login");
  const [formData , setFormData]=useState({
    username : "",
    email : "",
    password : ""
  })

  const changeHandle = (e)=>{
      const {name , value} = e.target;
      setFormData(prev => ({...prev , [name] : value}));
  }
  const login = async()=>{
    console.log("Login Function Executed" ,formData);
    try{
      const response = await fetch("http://localhost:4000/login" , {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.success)
      {
        localStorage.setItem('auth-token' , data.token);
        window.location.replace("/");
      }
      else{
        alert(data.error);
      }
    }
    catch(err){
      console.log("Error : ",err);
    }
    
  }
  const Signup = async ()=>{
 console.log("Sign Up function executed",formData);
    try{
      const response = await fetch("http://localhost:4000/signup" , {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.success)
      {
        localStorage.setItem('auth-token' , data.token);
        window.location.replace("/");
      }
      else{
        alert(data.error);
      }
    }
    catch(err){
      console.log("Error : ",err);
    }
  }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up"?<input type="text" name='username' value={formData.username} placeholder='Your Name' onChange={changeHandle} /> : <></>}
          <input type="email" name='email' value={formData.email} placeholder='Email Address' onChange={changeHandle}/>
          <input type="password" name='password' value={formData.password} placeholder='Password' onChange={changeHandle} />
        </div>
        <button onClick={()=>{state==="Login" ? login() : Signup()}}>Continue</button>
        {state==="Sign Up" ? <p className='loginsignup-login'>Already have an account ? <span onClick={()=>setState("Login")}>Login here</span></p> :<p className='loginsignup-login'>Create an Account  ? <span onClick={()=>setState("Sign Up")}>Click here</span></p> }
       
        
        <div className='loginsignup-agree'>
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup