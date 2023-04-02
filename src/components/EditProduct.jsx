import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct";

export default function EditProduct() {
  const [product, setProduct] = useState({})
  const {id} = useParams()


  useEffect(() => {
    getEditData(id)
  },[])
  
  const getEditData = (id) => {
    try {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => {
          if (res.status === 200) {
            res
              .json()
              .then(data => {
                setProduct(data);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  

  console.log("product", product)

  return <div>
   {product && <AddProduct
    data = {product}
    mode = {"Edit"}
    />}
  </div>;
}
