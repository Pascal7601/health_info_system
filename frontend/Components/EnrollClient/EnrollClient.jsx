import { useState } from 'react';
import './EnrollClient.css'
import { toast } from 'react-toastify';

const API = 'https://health-info-system-ywmt.onrender.com';

function EnrollClient({ showEnrollMenu, setShowEnrollMenu, programId}) {
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const handleEnroll = async () => {
    try {
      const response = await fetch(`${API}/api/program/${programId}/${name}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to enroll client');
      }

      toast.success(data.message);
      setName('');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      {showEnrollMenu &&
        <div className='enroll-menu'>
          <p>Enroll a client in this program</p>
          <label htmlFor="">Name:</label>
          <input type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
          <button onClick={handleEnroll} className='menu-submit'>Submit</button>
          <button onClick={() => setShowEnrollMenu(false)} className='menu-cancel'>Cancel</button>
        </div>
      }
    </>
  )
}

export default EnrollClient