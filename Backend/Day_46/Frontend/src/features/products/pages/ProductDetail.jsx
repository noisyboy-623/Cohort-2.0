import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useProduct } from '../hook/useProduct'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

// ── Static mock matching the provided data shape ──────────────────────────────
const MOCK_PRODUCT = {
    price: { amount: 2000, currency: 'INR' },
    _id: '69e3b666e0c90c0490fa4afc',
    title: 'cloth',
    description:
        'A clothing product is a wearable item designed for comfort, style, and functionality. It is made using fabrics like cotton, polyester, or wool, and crafted to suit different occasions, climates, and personal preferences. Clothing products can range from casual everyday wear to formal attire, combining design, fit, and durability to meet user needs.',
    seller: '69e0b2bd253abb9d03d6327c',
    images: [
        { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/Gemini_Generated_Image_79sy3179sy3179sy_juYlZvBts.png', _id: '69e3b666e0c90c0490fa4afd' },
        { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/Gemini_Generated_Image_kttj8okttj8okttj_E0r5fmOLK.png', _id: '69e3b666e0c90c0490fa4afe' },
        { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/6ffba481142bc477423971eb3ab4b804_v7NOstBO7J.jpg', _id: '69e3b666e0c90c0490fa4aff' },
        { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/8e784055bfaa566cf819cfc01471c6df_UqY0YUYWB.jpg', _id: '69e3b666e0c90c0490fa4b00' },
        { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/03a746727008ecefe1be91b312085038_zuDCaXhPE.jpg', _id: '69e3b666e0c90c0490fa4b01' },
    ],
    createdAt: '2026-04-18T16:50:46.711Z',
    updatedAt: '2026-04-18T16:50:46.711Z',
}
// ─────────────────────────────────────────────────────────────────────────────

const ProductDetail = () => {
    const { productId } = useParams()
    const { handleGetProductById } = useProduct()
    const [product, setProduct] = useState(null)
    const [activeImage, setActiveImage] = useState(0)
    const [loading, setLoading] = useState(true)

    async function fetchProductDetails() {
        setLoading(true)
        try {
            const data = await handleGetProductById(productId)
            setProduct(data || MOCK_PRODUCT)
        } catch {
            setProduct(MOCK_PRODUCT)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductDetails()
    }, [productId])

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
                <Navbar />
                <main className="flex-1 flex items-center justify-center pt-24">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs uppercase tracking-[0.25em] text-[#777777]">Loading piece…</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const displayProduct = product || MOCK_PRODUCT
    const images = displayProduct.images || []

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
            <Navbar />

            {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
            <div className="pt-24 px-6 md:px-16 lg:px-24">
                <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                    <span className="hover:text-black cursor-pointer transition-colors">Home</span>
                    <span>/</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Products</span>
                    <span>/</span>
                    <span className="text-black font-semibold capitalize">{displayProduct.title}</span>
                </nav>
            </div>

            {/* ── Main Content ───────────────────────────────────────────────── */}
            <main className="flex-1 px-6 md:px-16 lg:px-24 py-10 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* ── Left: Image Gallery ─────────────────────────────────── */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">

                        {/* Thumbnail strip */}
                        {images.length > 1 && (
                            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[480px] pb-2 md:pb-0 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={img._id}
                                        onClick={() => setActiveImage(idx)}
                                        className={`flex-shrink-0 w-14 h-16 md:w-16 md:h-20 overflow-hidden border-[1.5px] transition-all duration-200 ${
                                            activeImage === idx
                                                ? 'border-black'
                                                : 'border-transparent hover:border-[#c6c6c6]'
                                        }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`View ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main image */}
                        <div className="flex-1 relative aspect-[4/5]  bg-[#eeeeee] overflow-hidden group">
                            {images.length > 0 ? (
                                <img
                                    key={activeImage}
                                    src={images[activeImage]?.url}
                                    alt={displayProduct.title}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#a1a1a1] text-sm uppercase tracking-widest">
                                    No Image
                                </div>
                            )}

                            {/* Image counter badge */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1.5">
                                    {activeImage + 1} / {images.length}
                                </div>
                            )}

                            {/* Arrow navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImage(prev => (prev - 1 + images.length) % images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveImage(prev => (prev + 1) % images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Product Info ─────────────────────────────────── */}
                    <div className="flex flex-col justify-start pt-2 lg:pt-6">

                        {/* Label / tag */}
                        <div className="mb-6">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-[#888888] border border-[#c6c6c6] px-3 py-1.5">
                                In Stock
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-['Newsreader'] tracking-tight leading-tight capitalize mb-4">
                            {displayProduct.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-3xl font-bold tracking-tight">
                                {displayProduct.price?.currency === 'INR' ? '₹' : displayProduct.price?.currency}
                                {displayProduct.price?.amount?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#888888]">
                                {displayProduct.price?.currency}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[0.5px] bg-[#c6c6c6] mb-8" />

                        {/* Description */}
                        <div className="mb-10">
                            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-3">About this piece</h2>
                            <p className="text-sm text-[#474747] leading-relaxed">
                                {displayProduct.description}
                            </p>
                        </div>

                        {/* Meta info */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="border border-[#e2e2e2] bg-white p-4">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1">Product ID</p>
                                <p className="text-[10px] font-mono text-[#474747] truncate">{displayProduct._id}</p>
                            </div>
                            <div className="border border-[#e2e2e2] bg-white p-4">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1">Listed On</p>
                                <p className="text-[10px] font-mono text-[#474747]">
                                    {new Date(displayProduct.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit', month: 'short', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* ── Action Buttons ──────────────────────────────────── */}
                        <div className="flex flex-col sm:flex-row gap-3">

                            {/* Add to Cart */}
                            <button
                                id="add-to-cart-btn"
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-black bg-white text-black px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300"
                            >
                                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                                Add to Cart
                            </button>

                            {/* Buy Now */}
                            <button
                                id="buy-now-btn"
                                className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors duration-300"
                            >
                                <span className="material-symbols-outlined text-[16px]">bolt</span>
                                Buy Now
                            </button>
                        </div>

                        {/* Wishlist nudge */}
                        <button className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#888888] hover:text-black transition-colors w-max">
                            <span className="material-symbols-outlined text-[14px]">favorite</span>
                            Save to Wishlist
                        </button>

                        {/* Divider */}
                        <div className="w-full h-[0.5px] bg-[#c6c6c6] mt-10 mb-8" />

                        {/* Trust signals */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { icon: 'local_shipping', label: 'Free Delivery' },
                                { icon: 'published_with_changes', label: 'Easy Returns' },
                                { icon: 'verified', label: 'Authentic' },
                            ].map(item => (
                                <div key={item.label} className="flex flex-col items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[20px] text-[#474747]">{item.icon}</span>
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#777777]">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ProductDetail