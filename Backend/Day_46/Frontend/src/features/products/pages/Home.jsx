import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useNavigate } from 'react-router'

const Home = () => {
  const products = useSelector(state => state.product.allProducts)
  const { handleGetAllProducts } = useProduct()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState({})
  const [wishlist, setWishlist] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    handleGetAllProducts().then(() => setIsLoaded(true))
  }, [])

  const filteredProducts = (products || []).filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  const toggleWishlist = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleImageCycle = (productId, images, direction) => {
    setActiveImageIndex(prev => {
      const current = prev[productId] ?? 0
      const next = direction === 'next'
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length
      return { ...prev, [productId]: next }
    })
  }

  const getActiveImage = (product) => {
    const idx = activeImageIndex[product._id] ?? 0
    return product.images?.[idx]?.url || null
  }

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-16 overflow-hidden h-[55vh] md:h-[70vh] flex items-end bg-[#1a1c1c]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop"
          alt="Snitch editorial hero"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125"
        />
        <div className={`relative z-20 px-8 md:px-24 pb-12 md:pb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-white/60 font-['Manrope'] text-[10px] uppercase tracking-[0.3em] mb-3">
            New Season · Exclusively Yours
          </p>
          <h1 className="text-white text-5xl md:text-8xl font-['Newsreader'] tracking-tight leading-none mb-6">
            The Edit.
          </h1>
          <a
            href="#catalog"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#e2e2e2] transition-colors duration-300"
          >
            Shop Collection
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* ── Search & Filter Bar ── */}
      <section id="catalog" className="sticky top-[65px] z-40 bg-[#f9f9f9]/95 backdrop-blur-md border-b border-[#e2e2e2] px-6 md:px-24 py-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[11px] font-['Manrope'] uppercase tracking-[0.25em] text-[#474747]">
            All Products
          </h2>
          <span className="text-[10px] font-['Manrope'] text-[#a1a1a1] border border-[#e2e2e2] px-2 py-0.5">
            {filteredProducts.length} pieces
          </span>
        </div>
        <div className="relative w-full md:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1a1] text-[18px] pointer-events-none">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pieces…"
            className="w-full pl-9 pr-4 py-2 bg-transparent border border-[#e2e2e2] focus:border-black outline-none text-[12px] font-['Manrope'] placeholder:text-[#c6c6c6] transition-colors duration-200"
          />
        </div>
      </section>

      {/* ── Product Grid ── */}
      <main className="flex-1 px-6 md:px-24 py-12 pb-24 md:pb-16">
        {!isLoaded ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 animate-pulse">
                <div className="w-full aspect-[3/4] bg-[#e2e2e2]" />
                <div className="h-3 bg-[#e2e2e2] w-3/4 rounded" />
                <div className="h-3 bg-[#e2e2e2] w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-4">
            <span className="material-symbols-outlined text-5xl text-[#c6c6c6]">search_off</span>
            <h3 className="text-2xl font-['Newsreader'] text-[#474747]">No pieces found</h3>
            <p className="text-xs uppercase tracking-widest text-[#a1a1a1]">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {filteredProducts.map((product, i) => {
              const isWished = wishlist.includes(product._id)
              const imgUrl = getActiveImage(product)
              const imgCount = product.images?.length ?? 0

              return (
                <div
                onClick={()=>{navigate(`/product/${product._id}`)}}
                  key={product._id}
                  className={`group cursor-pointer flex flex-col transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] bg-[#eeeeee] overflow-hidden mb-4">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={product.title}
                        className="w-full h-full object-cover grayscale brightness-95 contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#a1a1a1]">
                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                      </div>
                    )}

                    {/* Top-right actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={e => toggleWishlist(product._id, e)}
                        className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all"
                      >
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0", color: isWished ? '#e53e3e' : 'black' }}
                        >
                          favorite
                        </span>
                      </button>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all">
                        <span className="material-symbols-outlined text-[16px] text-black">add_shopping_cart</span>
                      </button>
                    </div>

                    {/* Image carousel dots */}
                    {imgCount > 1 && hoveredProduct === product._id && (
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {product.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(prev => ({ ...prev, [product._id]: idx }))}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${(activeImageIndex[product._id] ?? 0) === idx ? 'bg-white scale-125' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* prev / next arrows */}
                    {imgCount > 1 && (
                      <>
                        <button
                          onClick={() => handleImageCycle(product._id, product.images, 'prev')}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-10"
                        >
                          <span className="material-symbols-outlined text-[14px] text-black">chevron_left</span>
                        </button>
                        <button
                          onClick={() => handleImageCycle(product._id, product.images, 'next')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-10"
                        >
                          <span className="material-symbols-outlined text-[14px] text-black">chevron_right</span>
                        </button>
                      </>
                    )}

                    {/* Quick-view strip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
                      <span className="text-[9px] text-white uppercase tracking-[0.25em] font-bold">Quick View</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-sm md:text-base font-['Newsreader'] tracking-tight leading-tight">
                        {product.title}
                      </h2>
                      <span className="text-[11px] font-['Manrope'] font-bold whitespace-nowrap mt-0.5 text-[#1a1c1c]">
                        {product.price?.currency} {product.price?.amount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#777777] uppercase tracking-widest line-clamp-1">
                      {product.description}
                    </p>
                    <button className="mt-3 w-full py-3 border border-[#1a1c1c] text-[10px] font-['Manrope'] font-bold uppercase tracking-[0.2em] text-[#1a1c1c] hover:bg-[#1a1c1c] hover:text-[#f9f9f9] transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
                      Add to Bag
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* ── Editorial Banner ── */}
      <section className="w-full bg-[#d6d6d6] text-[#1a1c1c] px-8 md:px-24 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#474747] mb-2">The Snitch Promise</p>
          <h2 className="text-3xl md:text-5xl font-['Newsreader'] leading-tight text-[#1a1c1c]">
            Curated. <br className="hidden md:block" />Elevated. <br className="hidden md:block" />Yours.
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:max-w-sm">
          {[
            { icon: 'local_shipping', label: 'Free Shipping', sub: 'On all orders above ₹999' },
            { icon: 'autorenew', label: 'Easy Returns', sub: '7-day hassle-free returns' },
            { icon: 'verified', label: 'Authenticated', sub: 'Every piece is quality checked' },
          ].map(item => (
            <div key={item.icon} className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#474747] text-2xl">{item.icon}</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1c1c]">{item.label}</p>
                <p className="text-[10px] text-[#777777]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home