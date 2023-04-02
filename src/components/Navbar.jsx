import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-purple-600 text-white font-semibold px-5 py-4">
      <div>
      <Link to="/">
          <p>Logo</p>
        </Link>
      </div>
      <div className="flex gap-10">
        <Link to="/products">
          <p>All Products</p>
        </Link>
        <Link to="/addproducts">
          <p>Add Products</p>
        </Link>
      </div>
    </div>
  );
}
