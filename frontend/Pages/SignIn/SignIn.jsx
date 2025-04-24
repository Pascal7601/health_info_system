import { useState } from 'react'
import './SignIn.css'

function SignIn() {
  const [formMode, setFormMode] = useState('Sign In');

  const toggleForm = () => {
    setFormMode(prev => prev == 'Sign In' ? 'Sign Up' : 'Sign In')
  }

  return (
    <div className='form-container'>
      <h2>{formMode}</h2>
      <form action="">
        { formMode == 'Sign Up' && 
          <>
            <label htmlFor="">First Name:</label>
            <input type="text" />
            <label htmlFor="">Last Name:</label>
            <input type="text" />
          </>
        }
        <label htmlFor="">Email:</label>
        <input type="email" />
        <label htmlFor="">Password:</label>
        <input type="password" />
        { formMode == 'Sign Up' &&
          <>
            <label htmlFor="">Repeat Password:</label>
            <input type="password" />
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