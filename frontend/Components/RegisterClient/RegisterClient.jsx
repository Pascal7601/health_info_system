import './RegisterClient.css'


function RegisterClient({showClientMenu, setShowClientMenu}) {
  return (
    <>
       {showClientMenu &&
        <div className='client-menu'>
          <p>Register a client</p>
          <label htmlFor="">Name:</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Email:</label>
          <input type="text" name="" id="" />
          <button className='menu-submit'>Submit</button>
          <button onClick={() => setShowClientMenu(false)} className='menu-cancel'>Cancel</button>
        </div>
      }
    </>
  )
}

export default RegisterClient