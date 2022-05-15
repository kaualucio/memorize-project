import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

export default function SignIn() {
  const { signInWithGoogle } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithGoogle()
  };
  
  return (
    <button onClick={handleLogin} className="rounded-lg text-md font-bold  outline-0 p-3 bg-sky-500 text-white">
      Entrar com o Google
    </button>
  )
}
