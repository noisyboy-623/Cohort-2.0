import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-[#e2e2e2]/60">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-black cursor-pointer select-none">menu</span>
        </div>
        <div className="text-2xl font-bold tracking-[-0.02em] text-black font-['Newsreader'] uppercase select-none">
          SNITCH
        </div>
        <div className="flex items-center gap-4">
          {/* <span className="material-symbols-outlined text-black cursor-pointer select-none">search</span> */}
          {/* <span className="material-symbols-outlined text-black cursor-pointer select-none" onClick={() => navigate("/cart")}>shopping_bag</span> */}
          <button className="material-symbols-outlined text-black cursor-pointer select-none" onClick={() => navigate("/cart")}>shopping_bag</button>
        </div>
      </nav>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#f9f9f9]/95 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-2 border-t border-gray-200">
        <a className="flex flex-col items-center justify-center text-black border-t-2 border-black pt-2" href="/">
          <span className="material-symbols-outlined">home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#search">
          <span className="material-symbols-outlined">search</span>
        </a>
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#favorite">
          <span className="material-symbols-outlined">favorite</span>
        </a>
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#person">
          <span className="material-symbols-outlined">person</span>
        </a>
      </nav>
    </>
  )
}

export default Navbar
