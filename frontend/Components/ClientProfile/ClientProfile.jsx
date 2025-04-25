import './ClientProfile.css'

function ClientProfile({showClientProfile, setShowClientProfile, client, enrolledPrograms}) {
  return (
    <>
      { showClientProfile &&
        <div className='client-profile'>
          <p>{client.name}</p>
          <p>Admitted on {new Date(client.created_at).toLocaleDateString()}</p>

          <div>
            {enrolledPrograms.length > 0 ? (
              enrolledPrograms.map(program => (
                <p key={program.id}>Enrolled in {program.name}</p>
              ))
            ) : (
              <p>No programs enrolled</p>
            )}
          </div>

          <button onClick={() => setShowClientProfile(false)}>Cancel</button>
        </div>
      }
    </>
  )
}

export default ClientProfile