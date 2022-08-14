import {useState} from 'react';
import axios from 'axios';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Css/login.css'

const LoginForm = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    var [errs,setErrs] = useState("");
    var [msg,setMsg] = useState("");
    const handleSubmit =async (e) =>{
        e.preventDefault();
        var data  = {email:email,password:password};
        axios.post('http://localhost:8000/api/login',data).then((succ)=>{
            if(succ.data){
                if(succ.data.rule == 'admin'){
                    localStorage.setItem('_authToken',succ.data.token);
                window.location.href = '/admin/dashbord';
                }
            }
            
        },(err)=>{
            if(err.response.status==422){
                setErrs(err.response.data);
                
            }else if (err.response.status==404){
                setMsg(err.response.data);
            }
        });
    }

    return(
<>

        <br/><br/><br/><br/>
            <form onSubmit={handleSubmit}>
                <div className='form-flex'>
                    <div className='inner-div'>
                    <h1>Login</h1>
                    <p>Back to <a href='/' className='home'>home</a></p>
                    <span className='text-danger'>{msg.lerr}</span><br/>
                    Email
                    <br/>
                    <span className='text-danger'>{errs.email? errs.email[0]:''}</span><br/>
                    <div className="form-outline mb-4">
                    
            <input type="text" id="typeEmailX-2" className="form-control form-control-lg"  name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            Password
            <br/>
                    <span className='text-danger'>{errs.password? errs.password[0]:''}</span><br/>
            <div className="form-outline mb-4">
            <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <input className="btn btn-primary" type="submit" value="Login"/>
            <br/>
            <p>Need an account?<a href='/customerRegistration'> Click here</a></p>
                    </div>
                
                </div>
            
            </form>
</>
    )
}
export default LoginForm;