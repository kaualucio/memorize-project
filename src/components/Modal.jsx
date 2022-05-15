import { FaTimes } from 'react-icons/fa'

export default function Modal({ setOpenMemorie, url }) {
  return (
    <div
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          className="absolute z-1 w-full h-full bg-black flex items-center justify-center"
        >
          <div className="w-9/12 mx-auto z-50 h-4/6 bg-white relative p-8 opacity-100 rounded-lg">
            <div
              className="absolute right-12 top-1.5 cursor-pointer text-2xl"
              onClick={() => setOpenMemorie(false)}
            >
              <FaTimes />
            </div>
            <img className="rounded-lg w-full h-full" src={url} alt="foto" />
          </div>
        </div>
  )
}
