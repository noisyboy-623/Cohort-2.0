import React, { useEffect } from 'react'
import { useProduct } from '../hook/useProduct'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useNavigate } from 'react-router'

const Dashboard = () => {

    const { handleGetSellerProducts } = useProduct()
    const sellerProducts = useSelector(state => state.product.sellerProducts)
    const navigate = useNavigate()

    useEffect(() => {
        handleGetSellerProducts()
    }, [])

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">

            <Navbar />

            <main className="flex-1 flex flex-col pt-24 px-8 md:px-24 min-h-screen pb-20 md:pb-12">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-['Newsreader'] tracking-tight mb-2">Curator's Vault</h1>
                        <p className="text-[#474747] font-['Manrope'] text-sm uppercase tracking-wider">Manage your exclusive pieces</p>
                    </div>
                    <Link to="/seller/create-product" className="inline-flex items-center justify-center bg-black text-[#e2e2e2] px-8 py-4 text-[12px] font-['Manrope'] font-bold uppercase tracking-[0.2em] hover:bg-[#5e5e5e] transition-colors duration-300 shadow-sm">
                        Publish New Piece
                    </Link>
                </header>

                {(!sellerProducts || sellerProducts.length === 0) ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-[0.5px] border-[#c6c6c6] bg-[#eeeeee]/50 p-12 text-center min-h-[40vh]">
                        <span className="material-symbols-outlined text-4xl text-[#777777] mb-4">inventory_2</span>
                        <h3 className="text-2xl font-['Newsreader'] mb-2">Your Vault is Empty</h3>
                        <p className="text-[#474747] text-xs uppercase tracking-widest max-w-sm mt-2">Begin curating your collection to showcase pieces to the world.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {sellerProducts.map(product => (
                            
                            <div onClick={() => {navigate(`/seller/product/${product._id}`)}} key={product._id} className="group cursor-pointer flex flex-col">
                                <div className="relative w-full aspect-[3/4] bg-[#eeeeee] overflow-hidden mb-6">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.title}
                                            className="w-full h-full object-cover grayscale brightness-95 contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#a1a1a1]">No Image</div>
                                    )}

                                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-black shadow-md transition-all">
                                            <span className="material-symbols-outlined text-[14px]">edit</span>
                                        </button>
                                        <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 text-black shadow-md transition-all">
                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                        </button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur px-3 py-1.5 m-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        <span className="text-[9px] text-black uppercase tracking-[0.2em] font-bold">Listed</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <h2 className="text-lg font-['Newsreader'] tracking-tight truncate">{product.title}</h2>
                                        <span className="font-['Manrope'] text-xs uppercase tracking-wider font-bold mt-1 whitespace-nowrap">
                                            {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#777777] uppercase tracking-widest truncate line-clamp-1">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default Dashboard