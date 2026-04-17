import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        contact: formData.contact,
        isSeller: formData.isSeller
    });
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-black" data-icon="menu">menu</span>
        </div>
        <div className="text-2xl font-bold tracking-[-0.02em] text-black font-['Newsreader'] uppercase">SNITCH</div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-black" data-icon="shopping_bag">shopping_bag</span>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col md:flex-row pt-16 md:pt-0">
        {/* Left Side: Editorial Image (Visible on Desktop) */}
        <section className="hidden md:flex md:w-1/2 h-screen sticky top-0 overflow-hidden bg-[#eeeeee] ">
          <div className="absolute inset-0 z-10 bg-black/10"></div>
          <img 
            alt="High fashion editorial photography" 
            className="w-full h-full object-cover grayscale brightness-90 contrast-125" 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
          />
          <div className="absolute bottom-12 left-12 z-20 max-w-md">
            <h2 className="text-white text-6xl font-['Newsreader'] leading-tight tracking-tighter transition-all duration-700 translate-y-0 opacity-100">
              Define <br />Your <br />Aesthetic.
            </h2>
            <p className="text-white/70 font-['Manrope'] text-sm tracking-widest uppercase mt-6">
              The Digital Curator for the Modern Individual
            </p>
          </div>
        </section>

        {/* Right Side: Registration Form */}
        <section className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 md:py-20 min-h-screen bg-[#f9f9f9]">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-['Newsreader'] tracking-tight mb-2">Create Account</h1>
              <p className="text-[#474747] font-['Manrope'] text-sm uppercase tracking-wider">Join the exclusive Snitch community</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Full Name */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Full Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:border-black focus:ring-0 px-0 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                  placeholder="ALEXANDER VOGUE" 
                  type="text" 
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Contact Number</label>
                <input 
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:border-black focus:ring-0 px-0 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                  placeholder="+1 (555) 000-0000" 
                  type="tel" 
                  required
                />
              </div>

              {/* Email */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Email Address</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:border-black focus:ring-0 px-0 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                  placeholder="CURATOR@SNITCH.CO" 
                  type="email" 
                  required
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Password</label>
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:border-black focus:ring-0 px-0 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                  placeholder="••••••••••••" 
                  type="password" 
                  required
                />
              </div>

              {/* Toggle: Is Seller */}
              <div className="flex items-center justify-between py-4 group">
                <div className="flex flex-col">
                  <span className="text-sm font-['Manrope'] uppercase tracking-widest text-[#1a1c1c]">Become a Seller</span>
                  <span className="text-[10px] text-[#474747] uppercase tracking-wider mt-1">Access merchant tools and editorial dashboard</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    name="isSeller"
                    checked={formData.isSeller}
                    onChange={handleChange}
                    className="sr-only peer" 
                    type="checkbox" 
                  />
                  <div className="w-11 h-5 bg-[#e8e8e8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border-0 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black transition-colors duration-300"></div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 space-y-4">
                <button 
                  className="w-full bg-black text-[#e2e2e2] py-5 text-[12px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#5e5e5e] transition-colors duration-300" 
                  type="submit"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[0.5px] bg-[#e8e8e8]"></div>
                  <span className="text-[10px] font-['Manrope'] tracking-[0.2em] text-[#474747] uppercase">or</span>
                  <div className="flex-1 h-[0.5px] bg-[#e8e8e8]"></div>
                </div>

                {/* Continue with Google */}
                {/* <button
                  type="button"
                  onClick={() => window.location.href = "/api/auth/google"}
                  className="w-full flex items-center justify-center gap-3 bg-transparent border-[0.5px] border-[#777777] text-black py-4 text-[12px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#f2f2f2] hover:border-black transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button> */}
                <ContinueWithGoogle />
              </div>
            </form>

            {/* Footer Links in Form */}
            <div className="mt-10 flex flex-col items-center gap-6">
              <p className="text-[10px] font-['Manrope'] text-[#474747] tracking-widest uppercase">
                Already have an account? 
                <a className="text-black font-bold border-b border-black ml-2 hover:opacity-70 transition-opacity" href="/login">Log in</a>
              </p>
              <div className="w-full h-[0.5px] bg-[#e8e8e8]"></div>
              <p className="text-[10px] font-['Manrope'] text-[#474747] tracking-widest text-center uppercase leading-relaxed">
                By signing up, you agree to our <a className="underline" href="#terms">Terms</a> and <a className="underline" href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Segment */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f3f3f3] dark:bg-[#121212] font-['Manrope'] text-[10px] tracking-widest text-black dark:text-white mb-20 md:mb-0">
        <div className="font-['Newsreader'] font-bold text-lg">SNITCH</div>
        <div className="flex gap-8">
          <a className="text-neutral-500 hover:text-black transition-colors" href="#privacy">PRIVACY</a>
          <a className="text-neutral-500 hover:text-black transition-colors" href="#terms">TERMS</a>
          <a className="text-neutral-500 hover:text-black transition-colors" href="#contact">CONTACT</a>
        </div>
        <div className="text-neutral-500 uppercase">© 2024 SNITCH. ALL RIGHTS RESERVED.</div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-xl flex justify-around items-center px-4 pb-6 border-t border-gray-200">
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#home">
          <span className="material-symbols-outlined" data-icon="home">home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#search">
          <span className="material-symbols-outlined" data-icon="search">search</span>
        </a>
        <a className="flex flex-col items-center justify-center text-neutral-400 pt-2" href="#favorite">
          <span className="material-symbols-outlined" data-icon="favorite">favorite</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black border-t-2 border-black pt-2" href="#person">
          <span className="material-symbols-outlined" data-icon="person">person</span>
        </a>
      </nav>
    </div>
  );
};

export default Register;