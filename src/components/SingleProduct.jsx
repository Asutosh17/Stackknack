import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const {id} = useParams()

  const [prodDetails, setProdDetails] = useState({})

  console.log("id",id)

  useEffect(() => {
    getSingleProd(id)
  }, [])

  const getSingleProd = (id) => {
    try {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => {
            if (res.status === 200) {
              res
                .json()
                .then(data => {
                  setProdDetails(data);
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="w-[90%] overflow-hidden bg-white shadow sm:rounded-lg border-t border-gray-200 px-4 py-5 sm:px-6 m-auto my-10">  
    <p className="mb-2 font-semibold text-lg">Products Details of Product {prodDetails.id}</p>
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Product name</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.title || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Brand Name</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.brand || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Description</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.description || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Category</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.category || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Price</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.price || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Discount Percentage</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.discountPercentage || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Rating</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.rating || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Stocks</dt>
        <dd className="mt-1 text-sm text-gray-900">{prodDetails.stocks || "Not Available"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500 mb-2">Thumbnail Image</dt>
        {/* <dd className="mt-1 text-sm text-gray-900">{}</dd> */}
        <img src={prodDetails.thumbnail} alt="" className="rounded"/>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">Image Links</dt>
        {
          prodDetails?.images?.map((el,i) => <a href={el} target="_blank" key={i} className="mt-1 block my-1 hover:text-blue-600 text-sm text-gray-900">{ el || "Not Available"}</a>)
        }
        
      </div>
    </dl>
  </div>   
    );
}
