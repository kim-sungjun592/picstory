import React from 'react'

const Button = ({
  text,
  className,
  icons}) => {
  return (
    <button className={`btn ${className}`}>
      {text}
      {icons && <img src='/images/arrow.svg'/>}
    </button>
  )
}

export default Button