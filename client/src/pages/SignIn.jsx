import './SignUp.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../component/OAuth';

export default function SignIn() { 
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='container'>
    <div className='signup-container'>
    <h1 className='signup-title'>Sign In</h1>
      
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type='email'
          placeholder='Email'
          className='signup-input'
          id='email' onChange={handleChange}
        required/>
        <input
          type='password'
          placeholder='Password'
          className='signup-input'
          id='password' onChange={handleChange}
        required/>
        <button  disabled={loading} className="btn bg-rose-200">
        {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='signup-login'>
        <p>Dont Have an account?</p>
        <Link  to={'/sign-up'}>
        <span>Sign up</span>
        </Link>
      </div>
      {error && <p className='mt-5 text-red-500'>{error}</p>}
    </div>
    </div>
  );
  
}
