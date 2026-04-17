import React, { useState, useRef, useCallback } from 'react';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from 'react-router';

const CreateProducts = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'USD',
  });
  const [ images, setImages ] = useState([]); 
  const [ isDragging, setIsDragging ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFiles = (files) => {
    const remaining = 7 - images.length;
    if (remaining <= 0) return;
    const toAdd = Array.from(files).slice(0, remaining);
    const newImages = toAdd.map(file => ({
        file,
        preview: URL.createObjectURL(file),
    }));
    setImages(prev => [ ...prev, ...newImages ]);
  };

  const handleFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files);
    }
  }, [ images ]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index) => {
    setImages(prev => {
        const updated = [ ...prev ];
        URL.revokeObjectURL(updated[ index ].preview);
        updated.splice(index, 1);
        return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priceAmount', formData.priceAmount);
      data.append('priceCurrency', formData.priceCurrency);
      images.forEach(img => data.append('images', img.file));

      await handleCreateProduct(data);
      alert("Product created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create product", error);
      alert("Failed to create product.");
    } finally {
      setIsSubmitting(false);
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
        {/* Left Side: Editorial Image */}
        <section className="hidden md:flex md:w-1/2 h-screen sticky top-0 overflow-hidden bg-[#eeeeee]">
          <div className="absolute inset-0 z-10 bg-black/10"></div>
          <img 
            alt="High fashion runway setup" 
            className="w-full h-full object-cover grayscale brightness-90 contrast-125" 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
          />
          <div className="absolute bottom-12 left-12 z-20 max-w-md">
            <h2 className="text-white text-6xl font-['Newsreader'] leading-tight tracking-tighter transition-all duration-700 translate-y-0 opacity-100">
              Curate <br />Your <br />Collection.
            </h2>
            <p className="text-white/70 font-['Manrope'] text-sm tracking-widest uppercase mt-6">
              The Digital Atelier for Exclusive Pieces
            </p>
          </div>
        </section>

        {/* Right Side: Form */}
        <section className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 md:py-20 min-h-screen bg-[#f9f9f9]">
          <div className="max-w-md w-full mx-auto pb-20 md:pb-0">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-['Newsreader'] tracking-tight mb-2">Create Product</h1>
              <p className="text-[#474747] font-['Manrope'] text-sm uppercase tracking-wider">Publish to the Snitch catalog</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Title */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Product Title</label>
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:outline-none focus:ring-0 focus:border-[#777777] px-2 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                  placeholder="OBSIDIAN TRENCH COAT" 
                  type="text" 
                  required
                />
              </div>

               {/* Description */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:outline-none focus:ring-0 focus:border-[#777777] px-2 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300 resize-none" 
                  placeholder="Detail the materials, cut, and aesthetic." 
                  required
                />
              </div>

              <div className="flex gap-6">
                {/* Price Amount */}
                <div className="group relative flex-1">
                  <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Price Amount</label>
                  <input 
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:outline-none focus:ring-0 focus:border-[#777777] px-2 py-2 text-[#1a1c1c] font-['Manrope'] placeholder:text-[#e2e2e2] transition-all duration-300" 
                    placeholder="0.00" 
                    type="number"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Price Currency */}
                <div className="group relative w-1/3">
                  <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-1">Currency</label>
                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b-[0.5px] border-[#777777] focus:outline-none focus:ring-0 focus:border-[#777777] px-2 py-2 text-[#1a1c1c] font-['Manrope'] appearance-none rounded-none transition-all duration-300 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%20fill%3D%22%231a1c1c%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-8px)_center]"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="CNY">CNY</option>
                  </select>
                </div>
              </div>

              {/* Images */}
              <div className="group relative">
                <label className="block text-[10px] font-['Manrope'] uppercase tracking-[0.2em] text-[#474747] mb-2 font-bold">Gallery ({images.length}/7)</label>
                <div 
                  className={`flex flex-wrap gap-4 transition-all duration-300 p-6 min-h-[140px] items-center rounded-sm border-[1px] border-dashed ${isDragging ? 'border-black bg-[#eeeeee] scale-[1.02]' : 'border-[#c6c6c6] bg-transparent'}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                      {images.length === 0 && !isDragging && (
                          <span className="text-[#a1a1a1] text-[10px] uppercase tracking-widest">Drag & Drop images here</span>
                      )}
                      {images.length === 0 && isDragging && (
                          <span className="text-black text-[10px] uppercase tracking-widest font-bold">Drop to upload</span>
                      )}
                  </div>
                  
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-28 bg-[#eeeeee] z-10 shadow-sm border border-[#e2e2e2] group/image">
                      <img src={img.preview} alt="Preview" className="w-full h-full object-cover grayscale brightness-90 contrast-125 rounded-sm" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-white/80 w-5 h-5 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity rounded-full hover:bg-white z-20"
                      >
                        <span className="material-symbols-outlined text-[10px] text-black">close</span>
                      </button>
                    </div>
                  ))}
                  {images.length < 7 && (
                    <div 
                      className="relative z-10 w-20 h-28 border-[0.5px] border-[#c6c6c6] hover:border-black transition-colors flex flex-col items-center justify-center cursor-pointer group/upload bg-white rounded-sm shadow-sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="material-symbols-outlined text-[#777777] group-hover/upload:text-black transition-colors">add</span>
                      <span className="text-[8px] text-[#777777] group-hover/upload:text-black uppercase tracking-wider mt-2 transition-colors">Upload</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button 
                  className="w-full flex items-center justify-center bg-black text-[#e2e2e2] py-5 text-[12px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#5e5e5e] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Piece'}
                </button>
              </div>
            </form>
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

export default CreateProducts;