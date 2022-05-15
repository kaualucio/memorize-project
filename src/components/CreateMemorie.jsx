import { useState, useContext } from 'react';
import { BsImages } from 'react-icons/bs';
import { AuthContext } from '../context/AuthContext';
import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from '../firebase';

function CreateMemorie() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [date, setDate] = useState('')
  const {user} = useContext(AuthContext)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const uploadMemorie = ref(storage, `images/${file.name}`)
    uploadBytes(uploadMemorie, file)
      .then((snapshot) => {
        console.log(snapshot)
      })
      .then(() => {
        getDownloadURL(uploadMemorie)
          .then((urlImg) => {
            addDoc(collection(db, 'memories'), {
              title,
              image: urlImg,
              date,
              username: user.name
            }).then(data => {
              console.log(data)
            })

            
          })
      })
  }

  return (
    <>
          <h1 className="text-2xl text-sky-500 font-bold mb-5">Crie uma memória</h1>
          <div className="w-full">
            <form action="">
              <div className="rounded-lg mb-3 bg-sky-500 text-white ">
                <label className="w-full p-3 flex items-center font-semibold cursor-pointer" htmlFor="image">
                  <span className="text-2xl mr-2"><BsImages /></span>
                  Escolha uma foto
                </label>
                <input className="hidden" type="file" onChange={handleChange} name="image" id="image" />
              </div>
              <div className="mb-3">
                <input className="rounded-lg w-full outline-0 p-3 border border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
                  type="text"
                  placeholder="Título da memória"
                  name="title"
                  id="title"
                  onChange={((e) => setTitle(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <input className="rounded-lg w-full outline-0 p-3 border border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
                  type="date"
                  placeholder="Data da memória"
                  name="date"
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button onClick={handleUpload} className="rounded-lg  outline-0 p-3 bg-sky-500 text-white">Criar memória</button>
            </form>
          </div>

    </>

  );
}

export default CreateMemorie;
