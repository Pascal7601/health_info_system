import { useState } from 'react';
import './CreateProgram.css'
import { toast } from 'react-toastify';

const API = 'http://localhost:8000/';

function CreateProgram({ showMenu, setShowMenu }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    const payload = { name, description};

    try {
      const res = await fetch(API + 'api/program/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.detail || 'Failed to add program');

      toast.success('Program added successfully!');
      setName('');
      setDescription('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {showMenu &&
      <div className='program-menu'>
        <p>Create A Program</p>
        <label htmlFor="">Name:</label>
        <input type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="">Description:</label>
        <input type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit} className='menu-submit'>Submit</button>
        <button onClick={() => setShowMenu(false)} className='menu-cancel'>Cancel</button>
      </div>
      }
    </>
  )
}

export default CreateProgram