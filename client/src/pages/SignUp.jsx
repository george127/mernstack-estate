import './SignUp.css'
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };

  return (
    <div className='container'>
    <div className='signup-container'>
    <h1 className='signup-title'>Sign Up</h1>
      
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type='text'
          placeholder='Username'
          className='signup-input'
          id='username' onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='signup-input'
          id='email' onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='signup-input'
          id='password' onChange={handleChange}
        />
        <button  disabled={loading} className="btn bg-rose-200">
        {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='signup-login'>
        <p>Have an account?</p>
        <Link  to={'/sign-in'}>
        <span>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    </div>
  );
  
}
