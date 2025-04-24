import './Home.css'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import CreateProgram from '../../Components/CreateProgram/CreateProgram';
import RegisterClient from '../../Components/RegisterClient/RegisterClient';
import EnrollClient from '../../Components/EnrollClient/EnrollClient';
import ClientProfile from '../../Components/ClientProfile/ClientProfile';


function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);
  const [showEnrollMenu, setShowEnrollMenu] = useState(false);
  const [showClientProfile, setShowClientProfile] = useState(false);

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
        <p className='health-pg' onClick={() => setShowEnrollMenu(true)}>TB</p>
        <p>Malaria</p>
        <div className='reg-clients'>
          <p>REGISTERED CLIENTS</p>
          <button onClick={()=> setShowClientMenu(true)}>Register a client</button>
        </div>
        <div className='search-container'>
          <input type="text" placeholder='search client' />
          <IoIosSearch className='search-icon'/>
        </div>
        <p className='client' onClick={() => setShowClientProfile(true)}>Pascal Ndubi</p>
        <p>Victor Naaman</p>
      </div>

      {/** program menu to add a health program in the system*/}
      <CreateProgram showMenu={showMenu} setShowMenu={setShowMenu}/>

      {/** Register a client in the system*/}
      <RegisterClient showClientMenu={showClientMenu} setShowClientMenu={setShowClientMenu}/>

      {/** Enroll clients in a health program */}
      <EnrollClient showEnrollMenu={showEnrollMenu} setShowEnrollMenu={setShowEnrollMenu}/>

      {/**View client Profile */}
      <ClientProfile showClientProfile={showClientProfile} setShowClientProfile={setShowClientProfile}/>
    </div>
  ) 
}
export default Home