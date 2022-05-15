import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { signOut, auth } from '../firebase'
import SignIn from './SignIn';

function Header() {
  const { user } = useContext(AuthContext)

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
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full">
              <img className="block rounded-full" src={user.photoURL} alt={user.name} />
            </div>
            <span className="text-white font-semibold mr-3 text-lg">{user.name}</span>
            <button
              onClick={logoff}
              type="submit"
              className="rounded-full text-white font-semibold px-4 py-1 bg-sky-500/100">Sair</button>
          </div>
        ) : <SignIn />
        }
      </div>
    </header>
  );
}

export default Header;
