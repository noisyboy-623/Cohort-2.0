import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;

  // 1. Find product
  let query = { _id: productId };
  if (variantId && variantId !== "base") {
    query["variants._id"] = variantId;
  }
  const product = await productModel.findOne(query);

  if (!product) {
    return res.status(404).json({
      message: "Product or Variant not found",
      success: false,
    });
  }

  // 2. Check stock
  const stock = await stockOfVariant(productId, variantId);

  // 3. Get/Create cart
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    cart = await cartModel.create({ user: req.user._id });
  }

  const targetVariantId = variantId === "base" ? undefined : variantId;

  // 4. Calculate Correct Price
  let itemPrice = {
    amount: product.price.amount,
    currency: product.price.currency
  };
  
  if (targetVariantId) {
    const selectedVariant = product.variants.id(targetVariantId);
    if (selectedVariant && selectedVariant.price && selectedVariant.price.amount) {
      itemPrice.amount = selectedVariant.price.amount;
      if (selectedVariant.price.currency) {
        itemPrice.currency = selectedVariant.price.currency;
      }
    }
  }

  // 5. Check if already in cart
  const existingItem = cart.items.find(item => 
    String(item.product) === String(productId) && 
    String(item.variant || "") === String(targetVariantId || "")
  );

  if (existingItem) {
    if (existingItem.quantity + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${existingItem.quantity} items in your cart`,
        success: false,
      });
    }
    existingItem.quantity += quantity;
    existingItem.price = itemPrice; // Update price to ensure consistency
  } else {
    if (quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock`,
        success: false,
      });
    }
    cart.items.push({
      product: productId,
      variant: targetVariantId,
      quantity,
      price: itemPrice,
    });
  }

  await cart.save();

  return res.status(200).json({
    message: existingItem ? "Cart updated successfully" : "Item added to cart",
    success: true,
  });
};

export const getCart = async (req, res) => {
  const user = req.user;
  let cart = await cartModel
    .findOne({ user: user._id })
    .populate("items.product");

  if (!cart) {
    cart = await cartModel.create({ user: user._id });
  }

  return res.status(200).json({
    message: "Cart fetched successfully",
    success: true,
    cart,
  });
};

export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  const cart = await cartModel
    .findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { _id: itemId } } },
      { new: true },
    )
    .populate("items.product");

  return res.status(200).json({
    message: "Item removed from cart",
    success: true,
    cart,
  });
};

export const updateCartQuantity = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Quantity must be at least 1", success: false });
  }

  const cart = await cartModel
    .findOneAndUpdate(
      { user: req.user._id, "items._id": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true },
    )
    .populate("items.product");

  return res.status(200).json({
    message: "Quantity updated",
    success: true,
    cart,
  });
};
