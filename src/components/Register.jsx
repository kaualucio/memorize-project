import React, { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from '../firebase'

function Register({ user, setUser, username, setUsername }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const unLogged = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //usuario logado
        // console.log(authUser)
        setUser(authUser)

        if (authUser.displayName) {
          //não atualizar o nome
        } else {
          return updateProfile(authUser, {
            displayName: username
          })
        }

      } else {
        setUser(null)
      }

    })
    return () => { unLogged() }
  }, [user, username])

  // const users = auth.currentUser;
  return (
    <div>
      <h1 className="text-2xl text-sky-500 font-bold mb-5">Crie sua conta</h1>
      <div className="w-full">
        <form action="">
          <div className="mb-3">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg w-full outline-0 p-3 border border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
              type="text"
              name="name"
              id="name"
              placeholder="Seu nome" />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg w-full outline-0 p-3 border border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
              type="email"
              placeholder="Seu email"
              name="email"
              id="email" />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg w-full outline-0 p-3 border border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
              type="password"
              placeholder="Sua senha"
              name="password"
              id="password" />
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="rounded-lg outline-0 p-3 bg-sky-500 text-white">
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
