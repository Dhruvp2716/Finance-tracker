import React, { useState } from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider} from '../../firebase';
import {useNavigate} from 'react-router-dom'
import {  doc, getDoc, setDoc } from "firebase/firestore";

function SignupSigninComponent() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [loginForm,setLoginForm] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  function SignupUsingEmail(){
    setLoading(true);
    console.log("name",name);
    console.log("email",email);
    console.log("password",password);
    console.log("confirmPassword",confirmPassword);
    

    if(name !== "" && email !== "" && password !== "" && confirmPassword !== ""){
      if (password === confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User : ",user);
        toast.success("User Created!");
        setName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        createDoc(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.errorMessage = errorMessage;
        setLoading(false);

      });
      } else {
        toast.error("Passwords Do not Match!");
        setLoading(false);

      }
      
    } else{
      toast.error("Please fill all the fields!");
      setLoading(false);
    }
  }

async function createDoc(user) {
  if (!user) return;

  const userRef = doc(db, "user", user.uid);
  const userData = await getDoc(userRef);

  if (!userData.exists()) {
    try{
      await setDoc(doc(db, "user", user.uid), {
        name : user.displayName ? user.displayName : name,
        email : user.email,
        photoURL : user.photoURL ? user.photoURL : "",
        createdAt : new Date(),
      });
    } catch(e) { 
      toast.error(e.message);
    }   
  } else {
    setLoading(false);
  }
}


  function loginUsingEmail(){
    setLoading(true);
    console.log("Email : ",email);
    console.log("Password",password);
    if(email !== "" && password !== "" ){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("Logged In!");
        console.log("Logged In User : ",user);
        navigate("/dashboard");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
    }else{
      toast.error("Please fill all the fields!");
      setLoading(false);
    }
    
  }

 function googleAuth(){
  setLoading(true);
  try{
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user : ",user);
        setLoading(false);
        toast.success("User Authenticated!")
        createDoc(user);
        navigate("/dashboard");
      // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
    } catch(e){
      toast.error(e.message);
    }
  
 }
  
  return (
    <>
    {loginForm?(<div className='signup-wrapper'>

        <h2 className='title'>Login on <span style={{color:"var(--theme)"}}>MyFinanceTracker</span></h2>
        <form>
          <Input
            label = {"Email "}
            state = {email}
            setState = {setEmail}
            placeholder='dhruvprajapati@gmail.com'
          />
          <Input
            label = {"Password"}
            type="password"
            state = {password}
            setState = {setPassword}
            placeholder='Example$123'
          />
          <p className='mar'></p>
          <Button 
            disabled={loading} 
            text = {loading?"Loading...":"Login Using Email"} 
            onClick={loginUsingEmail}/>
          <p className='or'>or</p>
          <Button 
            disabled={loading} 
            text = {loading?"Loading...":"Login using Google"} 
            alt = {true} 
            onClick={googleAuth}/>
          <p className='or' onClick={()=>setLoginForm(!loginForm)}>Don't have an Account? Click Here</p>
        </form>
      </div>)

      :

      (<div className='signup-wrapper'>
        <h2 className='title'>Signup on <span style={{color:"var(--theme)"}}>MyFinanceTracker</span></h2>
          <form>
            <Input
              label = {"Full Name"}
              state = {name}
              setState = {setName}
              placeholder='Dhruv Prajapati'
            />
            <Input
              label = {"Email "}
              state = {email}
              setState = {setEmail}
              placeholder='dhruvprajapati@gmail.com'
            />
            <Input
              label = {"Password"}
              type="password"
              state = {password}
              setState = {setPassword}
              placeholder='Example$123'
            />
            <Input
              label = {"Confirm Password"}
              type="password"
              state = {confirmPassword}
              setState = {setConfirmPassword}
              placeholder='Example$123'
            />
            <Button 
              disabled={loading} 
              text = {loading?"Loading...":"Signup Using Email"} 
              onClick={SignupUsingEmail}/>
            <p className='or'>or</p>
            <Button 
              disabled={loading} 
              text = {loading?"Loading...":"Signup using Google"} 
              alt = {true} 
              onClick={googleAuth}/>
            <p 
              className='or'
              onClick={()=>setLoginForm(!loginForm)}>
                Already have an Account? Click Here
            </p>
          </form>
      </div>)}
      
    </>
  )
}

export default SignupSigninComponent