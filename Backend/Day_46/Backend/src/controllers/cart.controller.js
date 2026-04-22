import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;

  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or Variant not found",
      success: false,
    });
  }

  const stock = await stockOfVariant(productId, variantId);

  const cart =
    (await cartModel.findOne({ user: req.user._id })) ||
    (await cartModel.create({ user: req.user._id }));

  const isProductAlreadyInCart = await cart.items.some(
    (item) => item.product._id == productId && item.variant._id == variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = await cart.items.find(
      (item) => item.product._id == productId && item.variant._id == variantId,
    ).quantity;

    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      {
        $inc: { "items.$.quantity": quantity },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Cart updated successfully",
      success: true,
    });
  }

  if (quantity > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock`,
      success: false,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  res.status(200).json({
    message: "Cart created successfully",
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
