import  Axios  from "../axiosConfig";
import { useState } from "react";
import '../LoginAndRegistration/Css/login.css'
import Nav from './Nav'
const AdminCreate = ()=>{
    const [email,setEmail] =useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [conPass,setConPass] = useState('');
    const [emailErr,setEmailErr] = useState(false);
    const [nameErr,setNameErr] = useState(false);
    const [passwordErr,setPasswordErr] =useState(false);
    const [conPassErr,setConPassErr] = useState(false);
    const [succM,setSucc] = useState('');
    const [err,seterr] = useState('');
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const nameValid = new RegExp(
        '[a-zA-Z .-]$'
    );
    const passwordValid = new RegExp(
        '[a-zA-Z0-9 .-]$'
    )
    const handleSubmit = (e)=>{
        e.preventDefault();
        var data = {name:name,password:password,email:email};
        let bool = true;
        if(!validEmail.test(email)){
            setEmailErr(true);
            bool = false;
        }else{
            setEmailErr(false);
        }
        if(!nameValid.test(name)){
            setNameErr(true);
            bool = false;
        }
        else{
            setNameErr(false);
        }
        if(!passwordValid.test(password)){
            setPasswordErr(true);
            bool=false;
        }else{
            setPasswordErr(false);
        }
        if(password!=conPass){
            setConPassErr(true);
            bool = false;
        }else{
            setConPassErr(false);
        }
        if(bool){
            Axios.post('/admin/createAdmin',data).then((succ)=>{
                setSucc("Account Created");
                if(succ.response.status == 422){
                    setSucc('');
                    seterr('Email already exist.');
                }else{
                    seterr('');
                }
            },(err)=>{
                if(err.response.status==500){
                    seterr('Email already exist.');
                }
            });
        }
    }
    return(
        <>
        <Nav/>
            <form onSubmit={handleSubmit}>
                <div className='form-flex'>
                    <div className='inner-div'>
                    <h1>Create Admin</h1>
                    <p>{succM?succM:''}</p>
                    <span className='text-danger'>{err?err:''}</span><br/>
                    Name
                    <br/>
                    <span className='text-danger'>{nameErr?'Name is not valid':''}</span><br/>
                    <div className="form-outline mb-4">
                    
            <input type="text"  className="form-control form-control-lg"  name='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
                    Email
                    <br/>
                    <span className='text-danger'>{emailErr?'Email is not valid':''}</span><br/>
                    <div className="form-outline mb-4">
                    
            <input type="text" id="typeEmailX-2" className="form-control form-control-lg"  name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            Password
            <br/>
            <span className='text-danger'>{passwordErr?'Password is not valid':''}</span><br/>
            <div className="form-outline mb-4">
            <input type="password"  className="form-control form-control-lg" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            Confirm password
            <br/>
            <span className='text-danger'>{conPassErr?'Password is not match':''}</span><br/>
            <div className="form-outline mb-4">
            <input type="password"  className="form-control form-control-lg" name='con_pass' value={conPass} onChange={(e)=>{setConPass(e.target.value)}} />
            </div>
            <input className="btn btn-primary" type="submit" value="Create"/>
            <br/>
                    </div>
                
                </div>
            
            </form>
        </>
    )
}
export default AdminCreate;