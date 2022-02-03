import React from 'react';
import { auth, signInWithEmailAndPassword, signOut } from '../firebase'

function Header({ user, email, setEmail, password, setPassword }) {


  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => alert(error.message));
  };

  const logoff = () => {
    signOut(auth)
    window.location.href = '/'
  }

  return (
    <header className="py-10 px-12 flex items-center justify-between border-b shadow-lg">
      <div>
        <h2 className="text-white text-3xl font-bold">Memorize</h2>
      </div>
      <div>
        {user?.displayName ? (
          <>
            <span className="text-white font-semibold mr-3 text-xl">{user.displayName}</span>
            <button
              onClick={logoff}
              type="submit"
              className="rounded-full text-white font-semibold px-4 py-1 bg-sky-500/100">Sair</button>
          </>
        ) : (
          <form action="" className="text-sm">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-32 mr-2 outline-0 px-3 py-1 rounded-full"
              type="email"
              placeholder="E-mail"
              name="email"
              id="email" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-32 mr-4 outline-0 px-3 py-1 rounded-full"
              type="password"
              placeholder="Senha"
              name="password"
              id="password" />
            <button type="submit" onClick={handleLogin} className="rounded-full text-white font-semibold px-4 py-1 bg-sky-500/100">Logar</button>
          </form>
        )}
      </div>
    </header>
  );
}

export default Header;
