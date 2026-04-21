import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { useProduct } from '../hook/useProduct'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const SellerProductDetails = () => {
    const { handleGetProductById, handleAddProductVariant } = useProduct()
    const { productId } = useParams()
    
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)

    // Image Upload States
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    // Form states for new variant
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [newVariant, setNewVariant] = useState({
        stock: 0,
        priceAmount: '',
        priceCurrency: 'INR',
        attributes: [{ key: '', value: '' }]
    })

    const [variantsList, setVariantsList] = useState([])

    async function fetchProductDetails() {
        setLoading(true)
        try {
            const data = await handleGetProductById(productId)
            const productData = data?.product || data
            setProduct(productData)
            setVariantsList(productData?.variants || productData?.varients || [])
            
            // Setup defaults for pricing based on product
            setNewVariant(prev => ({
                ...prev,
                priceAmount: productData?.price?.amount?.toString() || '',
                priceCurrency: productData?.price?.currency || 'INR'
            }))
        } catch (err){
            console.log("Failed to fetch product details", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(productId) {
            fetchProductDetails()
        }
    }, [productId])

    // --- Image Upload Handlers ---
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
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    // --- Dynamic Attributes Handlers ---
    const handleAddAttribute = () => {
        setNewVariant(prev => ({
            ...prev,
            attributes: [...prev.attributes, { key: '', value: '' }]
        }))
    }

    const handleRemoveAttribute = (index) => {
        setNewVariant(prev => {
            const newAttrs = [...prev.attributes]
            newAttrs.splice(index, 1)
            return { ...prev, attributes: newAttrs }
        })
    }

    const handleAttributeChange = (index, field, value) => {
        setNewVariant(prev => {
            const newAttrs = [...prev.attributes]
            newAttrs[index][field] = value
            return { ...prev, attributes: newAttrs }
        })
    }

    // --- Create Variant Submission ---
    const handleCreateVariant = (e) => {
        e.preventDefault()
        
        // Validation: At least one attribute is required
        const validAttributes = newVariant.attributes.filter(attr => attr.key.trim() && attr.value.trim())
        if (validAttributes.length === 0) {
            alert("At least one valid attribute (e.g. Size, Color) is required.")
            return
        }

        const attributesMap = {}
        validAttributes.forEach(attr => {
            attributesMap[attr.key.trim()] = attr.value.trim()
        })

        // Use uploaded images, or fallback to an empty array (image is optional)
        // For UI display purposes we use the preview object urls
        const variantImages = images.length > 0 
            ? images.map(img => ({ url: img.preview, file: img.file })) 
            : []

        // In a real scenario, you'd append this to a FormData and post to an API
        const variantObj = {
            _id: Math.random().toString(36).substr(2, 9),
            images: variantImages,
            stock: parseInt(newVariant.stock) || 0,
            attributes: attributesMap,
            price: {
                amount: parseFloat(newVariant.priceAmount) || null, // Optional
                currency: newVariant.priceCurrency
            }
        }

        setVariantsList([...variantsList, variantObj])
        // console.log("Created Variant Object:", variantObj)
        handleAddProductVariant(productId, variantObj)
        
        // Reset form
        setNewVariant({
            stock: 0,
            priceAmount: product?.price?.amount?.toString() || '',
            priceCurrency: product?.price?.currency || 'INR',
            attributes: [{ key: '', value: '' }]
        })
        setImages([])
        setIsFormVisible(false) // Close the form automatically on save
    }

    const handleStockChange = (variantId, newStock) => {
        setVariantsList(variantsList.map(v => 
            v._id === variantId ? { ...v, stock: parseInt(newStock) || 0 } : v
        ))
    }

    const handleDeleteVariant = (variantId) => {
        if (window.confirm("Are you sure you want to delete this variant?")) {
            setVariantsList(variantsList.filter(v => v._id !== variantId))
        }
    }

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

    if (!product) {
        return (
            <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
                <Navbar />
                <main className="flex-1 flex items-center justify-center pt-24">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#777777]">Product not found.</p>
                </main>
                <Footer />
            </div>
        )
    }

    const displayImages = product.images || []

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
            <Navbar />

            {/* Breadcrumb */}
            <div className="pt-24 px-6 md:px-16 lg:px-24">
                <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                    <span className="hover:text-black cursor-pointer transition-colors">Seller Dashboard</span>
                    <span>/</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Products</span>
                    <span>/</span>
                    <span className="text-black font-semibold capitalize">{product.title}</span>
                </nav>
            </div>

            <main className="flex-1 px-6 md:px-16 lg:px-24 py-10 pb-24 max-w-7xl mx-auto w-full">
                
                {/* ── Top Section: Main Product Details ───────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20 border-b border-[#dddddd] pb-16">
                    {/* Left: Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {displayImages.length > 1 && (
                            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[480px] pb-2 md:pb-0 scrollbar-hide">
                                {displayImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`flex-shrink-0 w-14 h-16 md:w-16 md:h-20 overflow-hidden border-[1.5px] transition-all duration-200 ${
                                            activeImage === idx
                                                ? 'border-black'
                                                : 'border-transparent hover:border-[#c6c6c6]'
                                        }`}
                                    >
                                        <img src={img.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="flex-1 relative aspect-[4/5] bg-[#eeeeee] overflow-hidden group">
                            {displayImages.length > 0 ? (
                                <img
                                    src={displayImages[activeImage]?.url}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#a1a1a1]">No Image</div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-start pt-2 lg:pt-6">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#888888] border border-[#c6c6c6] px-3 py-1.5 w-max mb-6">
                            Master Product
                        </span>
                        <h1 className="text-4xl md:text-5xl font-['Newsreader'] tracking-tight leading-tight capitalize mb-4">
                            {product.title}
                        </h1>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-3xl font-bold tracking-tight">
                                {product.price?.currency === 'INR' ? '₹' : product.price?.currency}
                                {product.price?.amount?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#888888]">
                                {product.price?.currency || ''}
                            </span>
                        </div>
                        <div className="mb-10">
                            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-3">About this piece</h2>
                            <p className="text-sm text-[#474747] leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-[#e2e2e2] bg-white p-4">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1">Product ID</p>
                                <p className="text-[10px] font-mono text-[#474747] truncate">{product._id}</p>
                            </div>
                            <div className="border border-[#e2e2e2] bg-white p-4">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1">Variants Count</p>
                                <p className="text-[10px] font-mono text-[#474747]">{variantsList.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Middle & Bottom: Variants Management ───────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Create New Variant Form Toggle or Display */}
                    <div className="lg:col-span-1 h-max sticky top-24">
                        {!isFormVisible ? (
                            <button 
                                onClick={() => setIsFormVisible(true)}
                                className="w-full bg-black text-[#e2e2e2] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                Add New Variant
                            </button>
                        ) : (
                            <div className="border border-[#e2e2e2] p-6 md:p-8 bg-white shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-['Newsreader'] tracking-tight flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                        Variant Details
                                    </h2>
                                    <button 
                                        onClick={() => setIsFormVisible(false)}
                                        className="text-[#a1a1a1] hover:text-black transition-colors"
                                        title="Cancel"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                        <form onSubmit={handleCreateVariant} className="flex flex-col gap-6">
                            
                            {/* Images Uploader (Similar to CreateProducts.jsx) */}
                            <div className="group relative">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#474747]">
                                        Variant Images <span className="font-normal">(Optional)</span>
                                    </label>
                                    <span className="text-[10px] text-[#888888] font-mono">{images.length}/7</span>
                                </div>
                                <div
                                    className={`flex flex-wrap gap-2 transition-all p-3 min-h-[100px] border-[1px] ${isDragging ? 'border-black bg-[#eeeeee] border-solid' : 'border-[#dddddd] border-dashed'} bg-[#fdfdfd]`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    {images.length === 0 && !isDragging && (
                                        <div className="w-full h-full flex items-center justify-center pointer-events-none text-[#a1a1a1] text-[10px] uppercase tracking-widest text-center py-6">
                                            Drag & Drop images
                                        </div>
                                    )}

                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative w-12 h-16 bg-[#eeeeee] z-10 shadow-sm border border-[#e2e2e2] group/image">
                                            <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute -top-2 -right-2 bg-white border border-[#dddddd] w-4 h-4 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity rounded-full hover:bg-[#f9f9f9] z-20"
                                            >
                                                <span className="material-symbols-outlined text-[10px] text-black">close</span>
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 7 && (
                                        <div
                                            className="relative z-10 w-12 h-16 border-[1px] border-dashed border-[#c6c6c6] hover:border-black transition-colors flex items-center justify-center cursor-pointer bg-white"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <span className="material-symbols-outlined text-[#777777] text-[14px]">add</span>
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

                            {/* Dynamic Attributes */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#474747] mb-3">
                                    Attributes <span className="text-red-500">*</span>
                                </label>
                                
                                <div className="flex flex-col gap-3">
                                    {newVariant.attributes.map((attr, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <input 
                                                type="text" 
                                                value={attr.key}
                                                onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                                className="w-1/2 border-b border-[#dddddd] py-1 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#d1d1d1]"
                                                placeholder="Key (e.g. Size)"
                                            />
                                            <input 
                                                type="text" 
                                                value={attr.value}
                                                onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                                className="w-1/2 border-b border-[#dddddd] py-1 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#d1d1d1]"
                                                placeholder="Value (e.g. XL)"
                                            />
                                            {newVariant.attributes.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveAttribute(idx)}
                                                    className="text-[#a1a1a1] hover:text-red-600 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    type="button"
                                    onClick={handleAddAttribute}
                                    className="mt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888] hover:text-black transition-colors flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-[14px]">add</span> Add Attribute
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#474747] mb-2">
                                        Price <span className="font-normal text-[#888888]">(Optional)</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        value={newVariant.priceAmount}
                                        onChange={(e) => setNewVariant({...newVariant, priceAmount: e.target.value})}
                                        className="w-full border-b border-[#dddddd] py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#d1d1d1]"
                                        placeholder={product.price?.amount?.toString() || "0.00"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#474747] mb-2">
                                        Stock
                                    </label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={newVariant.stock}
                                        onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                                        className="w-full border-b border-[#dddddd] py-2 text-sm focus:outline-none focus:border-black transition-colors"
                                        placeholder="10"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-black text-[#e2e2e2] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                Save Variant
                            </button>
                        </form>
                    </div>
                    )}
                    </div>

                    {/* Existing Variants List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-['Newsreader'] tracking-tight mb-6 flex items-baseline gap-3">
                            Variant Archive 
                            <span className="text-sm font-['Manrope'] text-[#888888]">({variantsList.length})</span>
                        </h2>
                        
                        {variantsList.length === 0 ? (
                            <div className="bg-white border border-[#e2e2e2] p-10 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-[#d4d4d4] mb-3">inventory</span>
                                <p className="text-sm text-[#777777] uppercase tracking-widest">No variants configured</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-240px)] pr-2 pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#dddddd transparent' }}>
                                {variantsList.map((variant) => (
                                    <div key={variant._id} className="bg-white border border-[#e2e2e2] flex flex-col sm:flex-row items-center gap-6 p-4 hover:border-black transition-colors group">
                                        
                                        {/* Thumbnail (Use First Image or Empty State) */}
                                        <div className="w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 bg-[#f4f4f4] overflow-hidden border border-[#eeeeee]">
                                            {variant.images && variant.images[0] ? (
                                                <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[9px] text-[#a1a1a1] uppercase tracking-widest p-2 text-center leading-relaxed">
                                                    No Img
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                            
                                            {/* Attributes */}
                                            <div className="col-span-2 sm:col-span-1">
                                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888]">Attributes</p>
                                                {variant.attributes && Object.keys(variant.attributes).length > 0 ? (
                                                    <div className="flex flex-wrap mt-1.5 gap-x-4 gap-y-2">
                                                        {Object.entries(variant.attributes).map(([k, v]) => (
                                                            <div key={k} className="flex flex-col">
                                                                <span className="text-[8px] uppercase tracking-[0.1em] text-[#666666] leading-none mb-1">{k}</span>
                                                                <span className="text-xs font-semibold capitalize leading-none">{v}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-[#474747] mt-1 block">Default</span>
                                                )}
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888]">Price</p>
                                                <p className="text-sm mt-1.5 font-medium">
                                                    {variant.price?.amount != null ? (
                                                        <>
                                                            {variant.price?.currency === 'INR' ? '₹' : variant.price?.currency}
                                                            {variant.price?.amount?.toLocaleString('en-IN')}
                                                        </>
                                                    ) : (
                                                        <span className="text-[#a1a1a1]">Inherited</span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* Stock Input & Actions */}
                                            <div className="sm:col-span-2 md:col-span-1 flex justify-between items-end">
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1.5">Stock</p>
                                                    <div className="flex items-center border border-[#dddddd] w-max bg-[#f9f9f9] group-hover:border-[#c6c6c6] transition-colors">
                                                        <button 
                                                            type="button"
                                                            className="px-3 py-1 text-[#474747] hover:bg-black hover:text-white transition-colors"
                                                            onClick={() => handleStockChange(variant._id, Math.max(0, variant.stock - 1))}
                                                        >
                                                            -
                                                        </button>
                                                        <input 
                                                            type="number"
                                                            className="w-12 text-center bg-transparent py-1 text-sm focus:outline-none"
                                                            value={variant.stock || 0}
                                                            onChange={(e) => handleStockChange(variant._id, e.target.value)}
                                                        />
                                                        <button 
                                                            type="button"
                                                            className="px-3 py-1 text-[#474747] hover:bg-black hover:text-white transition-colors"
                                                            onClick={() => handleStockChange(variant._id, (variant.stock || 0) + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteVariant(variant._id)}
                                                    className="w-8 h-8 flex items-center justify-center border border-transparent text-[#a1a1a1] hover:text-white hover:bg-red-600 hover:border-red-600 transition-colors ml-4 shrink-0"
                                                    title="Delete Variant"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SellerProductDetails