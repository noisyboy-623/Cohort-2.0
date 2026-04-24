/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'
import { useProduct } from '../hook/useProduct'
import { useCart } from '../../cart/hook/useCart'
import { toast } from 'react-toastify'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'

// ── Static mock matching the provided data shape ──────────────────────────────
const MOCK_PRODUCT = {
    price: { amount: 1234, currency: 'INR' },
    _id: '69e3b666e0c90c0490fa4afc',
    title: 'Cloth',
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
    updatedAt: '2026-04-20T11:55:37.792Z',
    variants: [
        {
            _id: "69e60d1591b3a9f160df4983",
            price: { amount: 1234, currency: "INR" },
            images: [],
            stock: 300,
            attributes: { abc: "def" }
        },
        {
            _id: "69e6105991b3a9f160df49d2",
            price: { amount: 8452, currency: "INR" },
            images: [
                { url: 'https://ik.imagekit.io/x2gd4sgsg/Snitch/6ffba481142bc477423971eb3ab4b804_v7NOstBO7J.jpg', _id: '69e3b666e0c90c0490fa4aff' }
            ],
            stock: 94,
            attributes: { color: "purple" }
        },
        {
            _id: "69e6143991b3a9f160df4a9c",
            price: { amount: 1234, currency: "INR" },
            images: [],
            stock: 0,
            attributes: {
                size: "XL",
                color: "pastel",
                person: "2",
                blanket: "yes",
                suitable: "adult"
            }
        }
    ]
}
// ─────────────────────────────────────────────────────────────────────────────

const ProductDetail = () => {
    const { productId } = useParams()
    const [activeImage, setActiveImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const { handleGetProductById } = useProduct()
    const [product, setProduct] = useState(null)

    const [selectedVariant, setSelectedVariant] = useState(null)
    const [selectedAttributes, setSelectedAttributes] = useState({})
    const { handleAddItem }  = useCart()

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

    const variants = (product || MOCK_PRODUCT).variants || []

    // ── Currency symbol map ───────────────────────────────────────────────────
    const CURRENCY_SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥' }
    const getSymbol = (currency) => CURRENCY_SYMBOLS[(currency || 'INR').toUpperCase()] || (currency || '₹')

    const availableAttributes = useMemo(() => {
        const attrs = {}
        variants.forEach(v => {
            Object.entries(v.attributes || {}).forEach(([key, val]) => {
                if (!attrs[key]) attrs[key] = new Set()
                attrs[key].add(val)
            })
        })
        const result = {}
        for (const key in attrs) {
            result[key] = Array.from(attrs[key])
        }
        return result
    }, [variants])

    // No auto-selection of variants[0] — base product price/stock/images show by default.
    // Variant is only selected when the user explicitly clicks an attribute button.

    const handleAttributeSelect = (key, value) => {
        const newAttributes = { ...selectedAttributes, [key]: value }
        
        let bestMatch = null
        let highestScore = -1
        
        variants.forEach(v => {
            const vAttrs = v.attributes || {}
            if (vAttrs[key] === value) {
                let score = 0
                Object.entries(newAttributes).forEach(([k, val]) => {
                    if (k !== key && vAttrs[k] === val) {
                        score++
                    }
                })
                if (score > highestScore) {
                    highestScore = score
                    bestMatch = v
                }
            }
        })
        
        if (bestMatch) {
            setSelectedVariant(bestMatch)
            setSelectedAttributes(bestMatch.attributes || {})
        } else {
            setSelectedAttributes(newAttributes)
        }
    }

    useEffect(() => {
        setActiveImage(0)
    }, [selectedVariant])

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

    const baseProduct = product || MOCK_PRODUCT
    const displayProduct = selectedVariant ? {
        ...baseProduct,
        // Only override price/images/stock — never overwrite title/_id/description with variant fields
        price: selectedVariant.price?.amount ? selectedVariant.price : baseProduct.price,
        images: selectedVariant.images?.length > 0 ? selectedVariant.images : baseProduct.images,
        stock: selectedVariant.stock !== undefined ? selectedVariant.stock : baseProduct.stock,
    } : baseProduct

    const images = displayProduct.images || []
    const isOutOfStock = displayProduct.stock === 0
    console.log(displayProduct.price?.amount)
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

                    {/* ── Left Column ─────────────────────────────────────────── */}
                    <div className="flex flex-col gap-8">
                        {/* ── Image Gallery ─────────────────────────────────── */}
                        <div className="flex flex-col-reverse md:flex-row gap-4">

                            {/* Thumbnail strip */}
                        {images.length > 1 && (
                            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-120 pb-2 md:pb-0 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={img._id}
                                        onClick={() => setActiveImage(idx)}
                                        className={`shrink-0 w-14 h-16 md:w-16 md:h-20 overflow-hidden border-[1.5px] transition-all duration-200 ${
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
                        <div className="flex-1 relative aspect-2/3  max-h-130 bg-[#eeeeee] overflow-hidden group">
                            {images.length > 0 ? (
                                <img
                                    key={activeImage}
                                    src={images[activeImage]?.url}
                                    alt={displayProduct.title}
                                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#a1a1a1] text-sm uppercase tracking-widest">
                                    No Image
                                </div>
                            )}

                            {/* Out of Stock Overlay */}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div className="bg-black/80 backdrop-blur-md text-white text-xs md:text-sm uppercase tracking-[0.3em] px-6 py-3 border border-white/20 shadow-xl transform -rotate-12 scale-110">
                                        Out of Stock
                                    </div>
                                </div>
                            )}

                            {/* Image counter badge */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 z-20">
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

                    {/* ── Variant Selectors ───────────────────────────────── */}
                        {Object.keys(availableAttributes).length > 0 && (
                            <div className="mt-4 space-y-6">
                                {Object.entries(availableAttributes).map(([attrKey, values]) => (
                                    <div key={attrKey}>
                                        <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-3">{attrKey}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {values.map(val => {
                                                const isSelected = selectedAttributes[attrKey] === val;
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => handleAttributeSelect(attrKey, val)}
                                                        className={`px-4 py-2 text-[11px] font-medium uppercase tracking-widest border transition-colors ${
                                                            isSelected
                                                                ? 'border-black bg-black text-white'
                                                                : 'border-[#e2e2e2] bg-white text-[#474747] hover:border-black'
                                                        }`}
                                                    >
                                                        {val}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Product Info ─────────────────────────────────── */}
                    <div className="flex flex-col justify-start pt-2 lg:pt-6">

                        {/* Label / tag */}
                        <div className="mb-4 flex flex-col gap-2">
                            <span
                                className={`text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 w-max border ${
                                    isOutOfStock
                                        ? 'text-red-500 border-red-300 bg-red-50'
                                        : 'text-[#888888] border-[#c6c6c6]'
                                }`}
                            >
                                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                            </span>
                            {!isOutOfStock && displayProduct.stock !== undefined && (
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                                    <span className="font-bold text-[#3a3a3a]">{displayProduct.stock}</span> units available
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-['Newsreader'] tracking-tight leading-tight capitalize mb-4">
                            {displayProduct.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-3xl font-bold tracking-tight">
                                {getSymbol(displayProduct.price?.currency)}
                                {(displayProduct.price?.amount ?? displayProduct.price)?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#888888]">
                                {(displayProduct.price?.currency || 'INR').toUpperCase()}
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
                                disabled={isOutOfStock}
                                className={`flex-1 flex items-center justify-center gap-2 border-2 border-black bg-white text-black px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                                    isOutOfStock ? 'opacity-50 cursor-not-allowed bg-[#f0f0f0] border-[#c6c6c6] text-[#888888]' : 'hover:bg-black hover:text-white'
                                }`}
                                onClick={async () => {
                                    try {
                                        const variantIdToSend = selectedVariant?._id || "base";
                                        await handleAddItem({ productId: product._id, variantId: variantIdToSend });
                                        toast.success("Item added to bag", { theme: "dark" });
                                    } catch (err) {
                                        toast.error("Choose an attribute first", { theme: "dark" });
                                    }
                                }}
                            >
                                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                                {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                            </button>

                            {/* Buy Now */}
                            <button
                                id="buy-now-btn"
                                disabled={isOutOfStock}
                                className={`flex-1 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                                    isOutOfStock ? 'opacity-50 cursor-not-allowed bg-[#a1a1a1]' : 'hover:bg-[#333333]'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">bolt</span>
                                Buy Now
                            </button>
                        </div>

                        {/* Wishlist nudge */}
                        <button 
                            className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#888888] hover:text-black transition-colors w-max"
                            onClick={() => toast.info("Item added to wishlist", { theme: "dark" })}
                        >
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
        </div>
    )
}

export default ProductDetail