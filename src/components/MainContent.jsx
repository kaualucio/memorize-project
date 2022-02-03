import React, { useState } from 'react';
import { db, collection, getDocs, query, where } from '../firebase';

function MainContent({ user, setOpenMemorie, setUrl, }) {
  const [memories, setMemories] = useState([])

  getMemories()
  async function getMemories() {
    const memorieArray = []
    const q = query(collection(db, 'memories'), where('username', '==', user.displayName))
    const results = await getDocs(q)
    results.forEach(doc => {
      memorieArray.push({ id: doc.id, memorie: doc.data() })
    });
    setMemories(memorieArray)
  }
  console.log(memories)

  return (
    <div className="px-10 py-8 mx-5 mb-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl text-sky-500 font-bold mb-5">Suas memórias</h1>
      {user?.displayName ? (
        <div className="grid grid-cols-6 gap-3">
          {memories?.map((memorie) => (
            <div key={memorie.id} onClick={() => { setOpenMemorie(true); setUrl(memorie.memorie.image) }} className="col-span-3 p-3 rounded-lg shadow-md mx-2 border cursor-pointer">
              <img className="rounded-lg w-full" src={memorie.memorie.image} alt="foto" />
              <div className="mt-3 text-center">
                <h2 className="text-xl font-semibold text-gray-600">{memorie.memorie.title}</h2>
                <p className="text-md text-gray-500">{memorie.memorie.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-2xl text-gray-500 font-bold mt-5 text-center">Cadastre-se ou logue para criar e ver suas memórias</p>
        </>
      )
      }
    </div >
  );
}

export default MainContent;
