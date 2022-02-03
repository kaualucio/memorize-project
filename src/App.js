import React, {useState} from 'react';
import { FaTimes } from "react-icons/fa";
import { Header, AboutUs, MainContent, CreateMemorie, Footer } from './components'

function App() {
  const [openMemorie, setOpenMemorie] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null)

  
  return (
    <div className=" relative w-full h-full">
      {openMemorie && (
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}} className="absolute z-1 w-full h-full bg-black flex items-center justify-center">
            <div className="w-9/12 mx-auto z-50 h-4/6 bg-white relative p-8 opacity-100 rounded-lg">
              <div className="absolute right-12 top-1.5 cursor-pointer text-2xl" onClick={() => setOpenMemorie(false)}>
                <FaTimes />
              </div>
              <img className="rounded-lg w-full h-full" src={url} alt="foto" />
            </div>
        </div>
      )}
      <Header user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      <AboutUs />
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-1">
          <MainContent user={user} setOpenMemorie={setOpenMemorie} setUrl={setUrl} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <CreateMemorie user={user} setUser={setUser} username={username} setUsername={setUsername} />
        </div> 
      </div>
      <Footer />
    </div>
  );
}

export default App;
