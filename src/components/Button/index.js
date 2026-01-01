import React from 'react'
import './styles.css'
function Button({text, onClick, alt, disabled}) {
  return (
    <div 
      className={alt ? 'ybutton':'button'} 
      onClick={onClick} 
      disabled = {disabled}>
       {text}
    </div>
  );
}

export default Button