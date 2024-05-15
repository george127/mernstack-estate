import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

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

        <Link to='/profile'>
            {currentUser ? (
              <img
                className='Image'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='nav-item text-red-200'>
            <p className='nav-link'>Sign In</p>
          </li>
            )}
          </Link>
        </ul>
        </div>
    </header>
  )
}
