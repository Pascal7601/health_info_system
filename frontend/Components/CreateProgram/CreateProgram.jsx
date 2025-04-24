import './CreateProgram.css'

function CreateProgram({ showMenu, setShowMenu }) {
  return (
    <>
      {showMenu &&
      <div className='program-menu'>
        <p>Create A Program</p>
        <label htmlFor="">Name:</label>
        <input type="text" name="" id="" />
        <button className='menu-submit'>Submit</button>
        <button onClick={() => setShowMenu(false)} className='menu-cancel'>Cancel</button>
      </div>
      }
    </>
  )
}

export default CreateProgram