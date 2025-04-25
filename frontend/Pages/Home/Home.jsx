import './Home.css'
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from 'react';
import CreateProgram from '../../Components/CreateProgram/CreateProgram';
import RegisterClient from '../../Components/RegisterClient/RegisterClient';
import EnrollClient from '../../Components/EnrollClient/EnrollClient';
import ClientProfile from '../../Components/ClientProfile/ClientProfile';
import { toast } from 'react-toastify'

const API = 'http://localhost:8000';

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);
  const [showEnrollMenu, setShowEnrollMenu] = useState(false);
  const [showClientProfile, setShowClientProfile] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem('token')

  const [programs, setPrograms] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);

  // fetch all clients and programs from the database
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API}/api/programs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.detail || 'Failed to load programs')
        setPrograms(data)
      } catch (err) {
        toast.error(err.message)
      }
    }

    const fetchClients = async () => {
      try {
        const res = await fetch(`${API}/api/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.detail || 'Failed to load clients')
        setClients(data)
      } catch (err) {
        toast.error(err.message)
      }
    }

    fetchPrograms()
    fetchClients()
  }, [setPrograms])

  // Fetch enrolled programs when a client is selected
  useEffect(() => {
    if (selectedClientId) {
      const fetchEnrolledPrograms = async () => {
        try {
          const res = await fetch(`${API}/api/${selectedClientId}/programs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.detail || 'Failed to load enrolled programs');
          setEnrolledPrograms(data);
        } catch (err) {
          toast.error(err.message);
        }
      };

      fetchEnrolledPrograms();
    }
  }, [selectedClientId, token]);

  // called when a certain program is clicked
  const handleEnrollClick = (programId) => {
    setSelectedProgramId(programId)
    setShowEnrollMenu(true)
  }
  // called when a client is clicked
  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
    setShowClientProfile(true);
  }

  return (
    <div>
      <div className='navbar'>
        <p>HEALTH INFORMATION SYSTEM</p>
      </div>
      <div className='health-info'>
        <div className='health-head'>
          <p>HEALTH PROGRAMS</p>
          <button onClick={() => setShowMenu(true)}>Create a program</button>
        </div>
        {/**iterate through the programs list and display them in paragraph */}
        {programs.map((program) => (
          <p key={program.id} className='health-pg' onClick={() => handleEnrollClick(program.id)}>
            {program.name}
          </p>
        ))}

        <div className='reg-clients'>
          <p>REGISTERED CLIENTS</p>
          <button onClick={()=> setShowClientMenu(true)}>Register a client</button>
        </div>
        <div className='search-container'>
          <input
            type="text"
            placeholder='Search client'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IoIosSearch
            className='search-icon'
            onClick={() => {
              setSearchTerm(searchInput.toLowerCase());
              setIsSearching(true);
            }}
          />
        </div>
        {/** iterates throgh client list and displays them */}
        {(isSearching
          ? clients.filter(client =>
              client.name.toLowerCase().includes(searchTerm)
            )
          : clients
        ).map(client => (
          <p key={client.id} className='client' onClick={() => handleClientClick(client.id)}>
            {client.name}
          </p>
        ))}
      </div>

      {/** program menu to add a health program in the system*/}
      <CreateProgram showMenu={showMenu} setShowMenu={setShowMenu}/>

      {/** Register a client in the system*/}
      <RegisterClient showClientMenu={showClientMenu} setShowClientMenu={setShowClientMenu}/>

      {/** Enroll clients in a health program */}
      <EnrollClient showEnrollMenu={showEnrollMenu} setShowEnrollMenu={setShowEnrollMenu}
                      programId={selectedProgramId}/>

      {/**View client Profile */}
      <ClientProfile showClientProfile={showClientProfile} setShowClientProfile={setShowClientProfile}
                      client={clients.find(client => client.id === selectedClientId)}
                      enrolledPrograms={enrolledPrograms}/>
    </div>
  ) 
}
export default Home