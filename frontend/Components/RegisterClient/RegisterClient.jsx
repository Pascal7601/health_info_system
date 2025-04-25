import { useState } from 'react';
import './RegisterClient.css'
import { toast } from 'react-toastify';

const API = 'http://localhost:8000/';

function RegisterClient({showClientMenu, setShowClientMenu}) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    const payload = { name, gender, dob };

    try {
      const res = await fetch(API + 'api/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.detail || 'Failed to register client');

      toast.success('Client registered successfully!');
      setName('');
      setGender('');
      setDob('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  
  return (
    <>
       {showClientMenu &&
        <div className='client-menu'>
          <p>Register a client</p>
          <label htmlFor="">Name:</label>
          <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Gender:</label>
          <input type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="">DOB:</label>
          <input type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)} />
          <button onClick={handleSubmit} className='menu-submit'>Submit</button>
          <button onClick={() => setShowClientMenu(false)} className='menu-cancel'>Cancel</button>
        </div>
      }
    </>
  )
}

export default RegisterClient