import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
function SignUp() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let [name,setNAME]=useState("")
    let [email,setEMAIL]=useState("")
    let [password,setPASSWORD]=useState("")
    let [role,setRole]=useState("")
    let [phonenumber,setPHONENUMBER]=useState("")
    async function validateSignUp(e){    
        if(!(/^[A-Za-z\s]{2,}$/.test(name))){
          e.preventDefault();
          alert("Your name should have more than one characters");
    }     
       if(!(emailRegex.test(email))){
          e.preventDefault();
          alert("Your email must include “@” and end with a valid domain like .com or .net (e.g., name@332.com)");
        }   
        if (!(/^[0-9]{11}$/.test(phonenumber))) {
          e.preventDefault();
          alert("Phone number must be 11 digits");
        }    
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))) {
          e.preventDefault();
          alert("Password should be 7 characters long with one uppercase letter,one lowercase letter and one special symbol");
        }if((/^[A-Za-z\s]{2,}$/.test(name))&&(emailRegex.test(email))&&(/^[0-9]{11}$/.test(phonenumber))&&
        (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))){
          e.preventDefault()
          const response = await axios.post(
            "https://online-learning-platform-19fq.onrender.com/api/signUp",
            {
              name,
              email,
              phonenumber,
              password,role
            }
        );
        if(response.data.message==='Signup Successful'){
          alert("Successful signup")
          document.getElementById("name").value="";
          document.getElementById("email").value="";
          document.getElementById("phoneNumber").value="";
          document.getElementById("password").value="";
          document.getElementById("role").value="";
        }else{
         alert("User with this email already exists. Please enter a different email"); 
        }}}
        function signUpFieldsEmpty(){
          document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("phoneNumber").value="";
      document.getElementById("password").value="";
      document.getElementById("role").value="";
        }
    return (<div className="container"><h1>Online Learning Platform</h1>
            <div className="card" style={{margin:'2% 25%',background:'pink'}}>

                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:'35px'}}>
                        Sign Up
                    </h5>
                    <form onSubmit={validateSignUp}><label>Name: &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" id="name" className="form-control" onChange={(e) => setNAME(e.target.value)} required/>
  <br/><label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="email" className="form-control" onChange={(e) => setEMAIL(e.target.value)} required/>
  <br/><label>Phone Number: &nbsp;</label>
  <input type="tel" id="phoneNumber" className="form-control" onChange={(e) => setPHONENUMBER(e.target.value)} required/><br/>
  <label>Password: &nbsp;</label>
  <input type="password" id="password" className="form-control" onChange={(e) => setPASSWORD(e.target.value)} required/>
  <br/><label>Role: &nbsp;</label>
  <select id="role" className="form-select" onChange={(e) => setRole(e.target.value)} required>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select><br/><div><button onClick={validateSignUp}className="btn btn-light">Sign Up
  </button><Link onClick={()=>{signUpFieldsEmpty();}} className="btn btn-light" to="/">Sign In</Link></div>
  </form>
                </div>

            </div>
        </div>
    );
}

export default SignUp;