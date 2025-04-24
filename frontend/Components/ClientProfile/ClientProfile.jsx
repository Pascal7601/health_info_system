import './ClientProfile.css'

function ClientProfile({showClientProfile, setShowClientProfile}) {
  return (
    <>
      { showClientProfile &&
        <div className='client-profile'>
          <p>Pascal Ndubi</p>
          <p>ndubi@gmail.com</p>
          <p>Admitted on 24th April 2025</p>
          <p>Enrolled in TB program</p>
          <button onClick={() => setShowClientProfile(false)}>Cancel</button>
        </div>
      }
    </>
  )
}

export default ClientProfile