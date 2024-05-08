import './SignUp.css'
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='container'>
    <div className='signup-container'>
    <h1 className='signup-title'>Sign Up</h1>
      
      <form  className='signup-form'>
        <input
          type='text'
          placeholder='Username'
          className='signup-input'
          id='username'
        />
        <input
          type='email'
          placeholder='Email'
          className='signup-input'
          id='email'
        />
        <input
          type='password'
          placeholder='Password'
          className='signup-input'
          id='password'
        />
        <button className="btn bg-rose-200">Sign up</button>
      </form>
      <div className='signup-login'>
        <p>Have an account?</p>
         <Link  to={'/sign-in'}>
         <span>Sign in</span>
         </Link>
      </div>
    </div>
    </div>
  );
  
}
