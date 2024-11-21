import React from "react";
import { useParams } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";

const CartPage = () => {
  const { id } = useParams(); 

  return (
    <div className="container">
      <h1 className="my-4 text-center">Shopping Cart</h1>
      <ShoppingCart userId={id} />
    </div>
  );
};

export default CartPage;
