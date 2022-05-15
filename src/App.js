import React, { useState } from 'react'
import { useContext } from 'react'
import {
  Header,
  AboutUs,
  MainContent,
  CreateMemorie,
  Footer
} from './components'
import Modal from './components/Modal'
import { AuthContext } from './context/AuthContext'

function App() {
  const [openMemorie, setOpenMemorie] = useState(false)
  const [url, setUrl] = useState('')
  const { user } = useContext(AuthContext)

  return (
    <div className=" relative w-full h-full">
      {openMemorie && <Modal setOpenMemorie={setOpenMemorie} url={url} />}
      <Header />
      <AboutUs />
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-1">
          <MainContent
            user={user}
            setOpenMemorie={setOpenMemorie}
            setUrl={setUrl}
          />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="mx-5 px-5 py-8 mb-10 bg-white rounded-lg shadow-lg">
            {user ? (
              <CreateMemorie />
            ) : (
              <h2 className="text-center text-xl text-sky-500 font-bold">
                Logue-se primeiro!
              </h2>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
