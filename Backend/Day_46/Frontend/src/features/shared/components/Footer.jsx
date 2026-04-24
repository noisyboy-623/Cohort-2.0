import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1a1c1c] font-['Manrope'] text-[10px] tracking-widest text-white mb-20 md:mb-0">
      <div className="font-['Newsreader'] font-bold text-lg text-white">SNITCH</div>
      <div className="flex gap-8">
        <a className="text-neutral-400 hover:text-white transition-colors" href="#privacy">PRIVACY</a>
        <a className="text-neutral-400 hover:text-white transition-colors" href="#terms">TERMS</a>
        <a className="text-neutral-400 hover:text-white transition-colors" href="#contact">CONTACT</a>
      </div>
      <div className="text-neutral-400 uppercase">© 2026 SNITCH. ALL RIGHTS RESERVED.</div>
    </footer>
  )
}

export default Footer
