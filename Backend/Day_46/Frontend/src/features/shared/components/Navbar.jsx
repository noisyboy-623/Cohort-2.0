import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../../cart/hook/useCart'

const Navbar = () => {
  const navigate = useNavigate()
  const { cartItems, handleGetCart } = useCart()
  
  useEffect(() => {
    handleGetCart()
  }, [])

  const cartItemCount = cartItems?.length || 0

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
          <button 
            className="relative flex items-center justify-center cursor-pointer select-none" 
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined text-black">shopping_bag</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
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
