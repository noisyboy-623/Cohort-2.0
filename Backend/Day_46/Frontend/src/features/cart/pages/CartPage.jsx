import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../hook/useCart";
import { useRazorpay } from "react-razorpay";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getVariantForItem(item) {
  if (!item?.product?.variants) return null;
  if (Array.isArray(item.product.variants)) {
    return item.product.variants.find((v) => v._id === item.variant) || null;
  }
  return item.product.variants;
}

function getDisplayImage(item) {
  const variant = getVariantForItem(item);
  if (variant?.images?.length > 0) return variant.images[0].url;
  return item.product?.images?.[0]?.url || null;
}

function getVariantLabel(item) {
  const variant = getVariantForItem(item);
  if (!variant?.attributes) return null;
  return Object.entries(variant.attributes)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
}

function getVariantPrice(item) {
  const variant = getVariantForItem(item);
  return variant?.price || item.price || null;
}
// ─────────────────────────────────────────────────────────────────────────────

const CartPage = () => {
  const navigate = useNavigate();
  const { handleGetCart, handleRemoveItem, handleUpdateQuantity, cartItems } =
    useCart();
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    handleGetCart().finally(() => setLoading(false));
  }, []);

  const items = cartItems || [];
  
  const subtotal = items.reduce((sum, item) => {
    const vPrice = getVariantPrice(item);
    const priceAmount = vPrice?.amount || item.price?.amount || 0;
    return sum + priceAmount * (item.quantity || 1);
  }, 0);
  const CURRENCY_SYMBOLS = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
  };
  const currency = items[0]?.price?.currency || "INR";
  const currencySymbol = CURRENCY_SYMBOLS[currency.toUpperCase()] || currency;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleRemove = async (itemId) => {
    setRemovingId(itemId);
    try {
      await handleRemoveItem(itemId);
    } finally {
      setRemovingId(null);
    }
  };

  const handleQtyChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    setUpdatingId(itemId);
    try {
      await handleUpdateQuantity(itemId, newQty);
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_Sk2h5Y0EiB5HYB",
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-[0.25em] text-[#777777]">
              Loading your bag…
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] antialiased min-h-screen flex flex-col font-['Manrope']">
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="pt-24 px-6 md:px-16 lg:px-24">
        <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#888888]">
          <span
            onClick={() => navigate("/")}
            className="hover:text-black cursor-pointer transition-colors"
          >
            Home
          </span>
          <span>/</span>
          <span className="text-black font-semibold">Your Bag</span>
        </nav>
      </div>

      {/* ── Page title ─────────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 lg:px-24 py-8 border-b border-[#e2e2e2]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#888888] mb-2">
              Review · Checkout
            </p>
            <h1 className="text-4xl md:text-5xl font-['Newsreader'] tracking-tight leading-tight">
              Your Bag
            </h1>
          </div>
          {items.length > 0 && (
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] border border-[#c6c6c6] px-3 py-1.5">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>
      </div>

      <main className="flex-1 px-6 md:px-16 lg:px-24 py-10 pb-24">
        {/* ── Empty state ─────────────────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
            <div className="w-24 h-24 border border-[#e2e2e2] flex items-center justify-center bg-white">
              <span className="material-symbols-outlined text-5xl text-[#c6c6c6]">
                shopping_bag
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-['Newsreader'] text-[#474747] mb-2">
                Your bag is empty
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#a1a1a1]">
                Discover pieces curated just for you
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-2 flex items-center gap-2 bg-black text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
            {/* ── Left: Cart Items ───────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-[#e2e2e2]">
              {items.map((item) => {
                const imgUrl = getDisplayImage(item);
                const variantLabel = getVariantLabel(item);
                const isRemoving = removingId === item._id;
                const isUpdating = updatingId === item._id;
                const variantPrice = getVariantPrice(item);
                const priceAmount = variantPrice?.amount || item.price?.amount || 0;
                const itemTotal = priceAmount * (item.quantity || 1);
                const saving = item.price?.amount - variantPrice?.amount;

                return (
                  <div
                    key={item._id}
                    className={`py-7 flex gap-6 transition-opacity duration-300 ${isRemoving ? "opacity-30 pointer-events-none" : "opacity-100"}`}
                  >
                    {/* Product Image */}
                    <div
                      onClick={() => navigate(`/product/${item.product?._id}`)}
                      className="shrink-0 w-24 h-32 md:w-28 md:h-36 bg-[#eeeeee] overflow-hidden cursor-pointer group"
                    >
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={item.product?.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-[#c6c6c6]">
                            image_not_supported
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between gap-0">
                      <div>
                        <h2
                          onClick={() =>
                            navigate(`/product/${item.product?._id}`)
                          }
                          className="text-base md:text-lg font-['Newsreader'] tracking-tight leading-tight cursor-pointer hover:underline underline-offset-2 mb-1"
                        >
                          {item.product?.title || "Product"}
                        </h2>
                        {variantLabel && (
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                            {variantLabel}
                          </p>
                        )}
                        {/* {item.price !== variantPrice && (
                          <>
                            {item.price > variantPrice ? (
                              <p className="text-[10px] text-red-500 uppercase tracking-[0.2em]">
                                {currencySymbol}
                                {item.price?.amount?.toLocaleString(
                                  "en-IN",
                                )}{" "}
                                ea.
                              </p>
                            ) : (
                              <p className="text-[9px] text-green-600 uppercase tracking-[0.2em] mt-9">
                                You saved {currencySymbol}
                                {(
                                  item.price?.amount - variantPrice?.amount
                                )?.toLocaleString("en-IN")}{" "}
                                ea.
                              </p>
                            )}
                          </>
                        )} */}
                        {saving > 0 ? (
                          <p className="text-[9px] text-green-600 uppercase tracking-[0.2em] mt-10">
                            You saved {currencySymbol}
                            {saving?.toLocaleString("en-IN")} ea.
                          </p>
                        ) : null}
                      </div>

                      {/* Qty + Remove */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        {/* Quantity stepper */}
                        <div className="flex items-center border border-[#e2e2e2] bg-white">
                          <button
                            onClick={() =>
                              handleQtyChange(item._id, item.quantity - 1)
                            }
                            disabled={isUpdating || item.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center text-[#474747] hover:bg-[#f0f0f0] disabled:opacity-30 transition-colors border-r border-[#e2e2e2]"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              remove
                            </span>
                          </button>
                          <span className="w-10 text-center text-[13px] font-bold tabular-nums">
                            {isUpdating ? (
                              <span className="inline-block w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() =>
                              handleQtyChange(item._id, item.quantity + 1)
                            }
                            disabled={isUpdating}
                            className="w-9 h-9 flex items-center justify-center text-[#474747] hover:bg-[#f0f0f0] disabled:opacity-30 transition-colors border-l border-[#e2e2e2]"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              add
                            </span>
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#a1a1a1] hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            delete
                          </span>
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 text-right flex flex-col justify-between">
                      <span className="text-sm font-bold tracking-tight">
                        {currencySymbol}
                        {itemTotal.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-[#a1a1a1] uppercase tracking-widest">
                        {currencySymbol}
                        {item.price?.amount?.toLocaleString("en-IN")} ea.
                      </span>
                      {/* {variantPrice && (
                                                    <p className="text-[10px] text-[#a1a1a1] uppercase tracking-widest">
                                                        {currencySymbol}{variantPrice?.amount?.toLocaleString('en-IN')} ea.
                                                    </p>
                                                )} */}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: Order Summary ───────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-[#e2e2e2] bg-white p-8 flex flex-col gap-6">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#888888]">
                  Order Summary
                </h2>

                {/* Line items */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[12px] text-[#474747]">
                    <span>
                      Subtotal ({items.length}{" "}
                      {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium">
                      {currencySymbol}
                      {subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px] text-[#474747]">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "text-green-600 font-medium"
                          : "font-medium"
                      }
                    >
                      {shipping === 0 ? "Free" : `${currencySymbol}${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-[#a1a1a1]">
                      Add {currencySymbol}
                      {(999 - subtotal + 1).toLocaleString("en-IN")} more for
                      free shipping
                    </p>
                  )}
                </div>

                <div className="w-full h-[0.5px] bg-[#e2e2e2]" />

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold tracking-tight">
                      {currencySymbol}
                      {total.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-[#a1a1a1]">
                      {currency} · Incl. taxes
                    </p>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  id="checkout-btn"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors duration-300"
                  onClick={handlePayment}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    bolt
                  </span>
                  Proceed to Checkout
                </button>

                {/* Continue shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center gap-2 border border-[#e2e2e2] text-[#474747] py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black hover:text-black transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>
                  Continue Shopping
                </button>

                {/* Trust signals */}
                <div className="w-full h-[0.5px] bg-[#e2e2e2]" />
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: "local_shipping", label: "Free Delivery" },
                    { icon: "published_with_changes", label: "Easy Returns" },
                    { icon: "verified", label: "Authentic" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#474747]">
                        {item.icon}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.15em] text-[#777777] leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
