import './EnrollClient.css'

function EnrollClient({ showEnrollMenu, setShowEnrollMenu}) {
  return (
    <>
      {showEnrollMenu &&
        <div className='enroll-menu'>
          <p>Enroll a client in this program</p>
          <label htmlFor="">Name:</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Email:</label>
          <input type="text" name="" id="" />
          <button className='menu-submit'>Submit</button>
          <button onClick={() => setShowEnrollMenu(false)} className='menu-cancel'>Cancel</button>
        </div>
      }
    </>
  )
}

export default EnrollClient