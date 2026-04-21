import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      console.log(user.role)
      if (user.role === "buyer") {
        navigate("/");
      } else if (user.role === "seller") {
        navigate("/seller/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
      <Navbar />

      {/* <main className="flex flex-col md:flex-row md:items-stretch pt-18 min-h-screen"> */}
      <main className="min-h-screen flex flex-col md:flex-row pt-16 md:pt-0">  
        {/* Left Side: Editorial Image */}
        <section className="w-full h-[40vh] md:h-auto md:w-1/2 relative overflow-hidden bg-[#eeeeee]">
          <div className="absolute inset-0 z-10 bg-black/20 md:bg-black/10"></div>
          <img
            alt="High fashion editorial photography"
            className="absolute inset-0 w-full h-full object-cover object-top top-7 grayscale brightness-90 contrast-125"
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
          />
          <div className="absolute bottom-25 left-12 z-20 max-w-md">
            <h2 className="text-white text-4xl md:text-6xl font-['Newsreader'] leading-tight tracking-tighter transition-all duration-700 translate-y-0 opacity-100">
              Welcome <br className="hidden md:block" />
              Back.
            </h2>
            <p className="text-white/80 font-['Manrope'] text-[10px] md:text-sm tracking-widest uppercase mt-2 md:mt-6">
              Continue Your Curation Journey
            </p>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 md:py-20 bg-[#f9f9f9]">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-['Newsreader'] tracking-tight mb-2">
                Log In
              </h1>
              <p className="text-[#474747] font-['Manrope'] text-sm uppercase tracking-wider">
                Access your Snitch account
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Email */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">
                  Email Address
                </label>
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
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747]">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    className="text-[10px] font-['Manrope'] text-[#474747] hover:text-black transition-colors"
                  >
                    FORGOT PASSWORD?
                  </a>
                </div>
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

              {/* Submit Button */}
              <div className="pt-4 space-y-4">
                <button
                  className="w-full bg-black text-[#e2e2e2] py-5 text-[12px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#5e5e5e] transition-colors duration-300"
                  type="submit"
                >
                  Log In
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[0.5px] bg-[#e8e8e8]"></div>
                  <span className="text-[10px] font-['Manrope'] tracking-[0.2em] text-[#474747] uppercase">
                    or
                  </span>
                  <div className="flex-1 h-[0.5px] bg-[#e8e8e8]"></div>
                </div>

                {/* Continue with Google */}
                {/* <button
                  type="button"
                  onClick={() => window.location.href = "http://localhost:3000/api/auth/google"}
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
                Don't have an account?
                <a
                  className="text-black font-bold border-b border-black ml-2 hover:opacity-70 transition-opacity"
                  href="/register"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
