import React from 'react';

export default function NavBar({ setLocation }) {

  const changeLocation = (e) => {
    setLocation(e.target.value)
  }

  return(
    <div>
      <button
        value={'Home'}
        onClick={changeLocation}>Home</button>
      <button
        value={'Addresses'}
        onClick={changeLocation}>Addresses</button>
    </div>
  )
}