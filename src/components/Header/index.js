import React, { useEffect } from 'react';
import "./styles.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  },[user,loading])
  function logout() {
    signOut(auth)
      .then(() => {
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
  
  return (
    <div className='navbar'>
      <p className='logo'>MyFinanceTracker</p>
      {user &&
        <p className='link' onClick={logout} >Logout</p>
      }
    </div>
  )
}

export default Header