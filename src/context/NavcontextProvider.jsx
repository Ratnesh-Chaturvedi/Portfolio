import React, { createContext, useContext, useState } from 'react'


export const NavContext=createContext();
 const NavcontextProvider = (props) => {

    const [navOpen,setNavOpen]=useState(false);
const values={
    navOpen,setNavOpen
}

  return (
    <NavContext.Provider  value={values}>
    {props.children}
    </NavContext.Provider>
  )
}


export default NavcontextProvider;

