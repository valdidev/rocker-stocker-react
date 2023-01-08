import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import './navbar.css';

export const Navbar = () => {


  const { handlerAuth } = useContext(AuthContext)

  return (
    <div className="navbarDesign">
      <button onClick={() => handlerAuth()}>logout</button>
    </div>
  )
}
