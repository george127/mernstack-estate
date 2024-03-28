import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
        <div className='container'>
        <Link to='/'>
        <h1 className='logo'>
            <span className='text-rose-200'>Mern</span>
            <span className=''>Estate</span>
        </h1> 
        </Link>
        <form className='forms-container'>
            <input type='text' placeholder='Type to search...' className='input bg-rose-200' />
            <span className="material-symbols-outlined">search</span>        
        </form>
        <ul className='link-container'>
          <Link to='/'>
          <li className='nav-item text-red-200'>
            <p className='nav-link'>Home</p>
          </li>
          </Link>
          
          <Link to='/about'>
          <li className='nav-item text-red-200'>
            <p className='nav-link'>About</p>
          </li>
          </Link>

        <Link to='/sign-in'>
        <li className='nav-item text-red-200'>
            <p className='nav-link'>SignIn</p>
          </li>
        </Link>
        </ul>
        </div>
    </header>
  )
}
