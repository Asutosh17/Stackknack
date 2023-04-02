import React, { useEffect, useState } from "react";
import { InformationCircleIcon, PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Pagination from "./Common/Pagination";


export default function ProductPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageLimit = 20;
  const navigate = useNavigate()

  const goToSingleProd = (id) => {
    navigate(`/products/${id}`)
  } 

  const EditData = (id) => {
      navigate(`/editproduct/${id}`)
  }

  const getAllProducts = () => {
    try {
      fetch(`https://dummyjson.com/products?limit=${pageLimit}&page=${pageIndex}`)
        .then(res => {
          if (res.status === 200) {
            res
              .json()
              .then(data => {
                setAllProducts(data);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const onProdDelete = (id) => {
    try {
      fetch(`https://dummyjson.com/products/${id}`,{
        method: "DELETE",
      })
        .then(res => {
          if (res.status === 200) {
            alert("Successful Deleted")
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  const paginationClick = (page_number) => {
    setPageIndex(page_number);
  };


  useEffect(() => {
    getAllProducts();
  }, [pageIndex]);
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5 lg:py-10 px-5">
      {allProducts?.products?.map((el, i) => (
        <div key={i} className=" rounded-lg shadow-xl bg-violet-200 relative group/item">
          <XCircleIcon onClick={() => onProdDelete(el.id)} width={25} height={25} className="absolute right-0 fill-violet-500 hover:fill-violet-600 hover:cursor-pointer invisible group/edit group-hover/item:visible"/>
          <img src={el.thumbnail} alt="thumbnail image" className="rounded-t-lg"/>
          <div className="font-semibold text-lg px-2 pt-2">
          <p className="flex justify-between">  
            {el.title} <span className="flex text-xs items-center"> <span className="hover:cursor-pointer flex items-center">
            More-info <InformationCircleIcon onClick={() => goToSingleProd(el.id)} width={20} height={20} className="fill-violet-600"/></span>
              </span>
          </p>          
          <p className="text-sm flex justify-between">
            <span>
            <span className="font-normal"> Brand -  {" "} </span>
            {el.brand}
            </span>
            <span className="text-xs flex items-center gap-2 hover:cursor-pointer" onClick={() => EditData(el.id)}>
            Edit   
            <PencilIcon width={15} height={15} className="fill-purple-500"/>
            </span>
          </p>
          <p className="text-sm">
          <span className="font-normal text-sm"> Price -  {" "} </span>
            {el.price}
          </p>
          <p className="text-sm">
          <span className="font-normal text-sm"> Category -  {" "} </span>  
            {el.category}
          </p>
          </div>
          
        </div>
      ))}
      </div>
      <Pagination
                containerstyle={"w-full fixed bottom-0 mt-20"}
                totalRecords={allProducts.total}
                recordsPerPage={allProducts.limit}
                currentPage={pageIndex}
                paginationClick={paginationClick}
              />
      </div>
  );
}
