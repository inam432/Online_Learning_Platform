import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function SignIn() {
  const navigate = useNavigate();
   let [email2,setEMAIL2]=useState("")
    let [password2,setPASSWORD2]=useState("")
    async function validateSignin(event){
        event.preventDefault()
        const response = await axios.post(
          "https://online-learning-platform-19fq.onrender.com/api/signIn",
          {
            email2,
            password2
          }
      );
  if(response.data.message==='Login Successful'){
    localStorage.setItem("token",JSON.stringify(response.data.token));
localStorage.setItem("user",JSON.stringify({name:response.data.user.name,email:response.data.user.email,
role:response.data.user.role}));
    alert('Successful Login')
    document.getElementById("email2").value="";
    document.getElementById("password2").value="";
    navigate("/dashboard");
  }else{
    alert("Login not successful. Please check your email and password and try again.");
  }
      }    
      function signInFieldsEmpty(){
    document.getElementById("email2").value="";
    document.getElementById("password2").value="";
      }
    return (<div className="container"><h1>Online Learning Platform</h1>
            <div className="card" style={{margin:'2% 25%',background:'pink'}}>

                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:'35px'}}>
                        Sign In
                    </h5>
                    <form onSubmit={validateSignin}><label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="email2" className="form-control" onChange={(e) => setEMAIL2(e.target.value)} required/>
  <br/>
  <label>Password: &nbsp;</label>
  <input type="password" id="password2" className="form-control" onChange={(e) => setPASSWORD2(e.target.value)} required/>
  <br/><div><button className="btn btn-light">Sign In
  </button><Link onClick={()=>{signInFieldsEmpty();}} className="btn btn-light" to="/signup">Sign Up</Link></div>
  </form>
                </div>

            </div>
        </div>
    );
}

export default SignIn;