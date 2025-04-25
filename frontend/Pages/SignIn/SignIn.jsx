import { useState } from 'react'
import './SignIn.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8000/'

function SignIn() {
  const [formMode, setFormMode] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();

  const toggleForm = () => {
    setFormMode(prev => prev == 'Sign In' ? 'Sign Up' : 'Sign In'); // toggle between sign in and sign up
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // check if passwords are same before sending data to backend
    if (formMode === 'Sign Up' && password !== repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
      email,
      password,
      ...(formMode === 'Sign Up' && { name })
    };
    
    // post data to the backend
    try {
      const endpoint = formMode === 'Sign In' ? 'api/login' : 'api/sign_up';
      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.detail || 'Something went wrong');

      toast.success(`${formMode} successful!`);
      if(formMode == 'Sign In') {
        const token = data.access_token;
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setFormMode('Sign In');
        setPassword('');
        setRepeatPassword('');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='form-container'>
      {/** form that handles sign in and sign up logic */}
      <h2>{formMode}</h2>
      <form onSubmit={handleSubmit} action="">
        { formMode == 'Sign Up' && 
          <>
            <label htmlFor="">Name:</label>
            <input type="text" 
              value={name}
              onChange={(e)=> setName(e.target.value)}
              required/>
          </>
        }
        <label htmlFor="">Email:</label>
        <input type="email" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required/>

        <label htmlFor="">Password:</label>
        <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
        { formMode == 'Sign Up' &&
          <>
            <label htmlFor="">Repeat Password:</label>
            <input type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required />
          </>
        }
        <button>Submit</button>
        <p>{ formMode == 'Sign In' ? "Don't have an account? " : 'Already have an account? ' }
          <span onClick={toggleForm} className='form-toggle'>{ formMode == 'Sign In' ? 'sign up' : 'sign in'}</span>
          </p>
      </form>
    </div>
  )
}

export default SignIn