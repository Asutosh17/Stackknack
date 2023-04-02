import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import ProductPage from "../components/ProductPage";
import Navbar from "../components/Navbar";
import SingleProduct from "../components/SingleProduct";

export default function AllRoutes() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/addproducts" element={<AddProduct />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/editproduct/:id" element={<EditProduct />}></Route>
      </Routes>
    </div>
  );
}
