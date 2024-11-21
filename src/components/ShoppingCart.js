import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api
      .get(`/users/cart/${id}`)
      .then((response) => setCart(response.data))
      .catch(() => toast.error("Failed to load cart. Please try again."));
  }, [id]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length ? (
        <ul>
          {cart.map((item) => (
            <li key={item.productId._id}>
              {item.productId.name} - {item.quantity} pcs - ${item.productId.price * item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
