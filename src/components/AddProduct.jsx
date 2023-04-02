import React, { useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Input from "./Common/Input";
import { useNavigate } from "react-router-dom";
import { URLregex, numberValidate } from "../sitesettings";

export default function AddProduct({data, mode}) {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [isRatingError, setIsRatingError] = useState(false)
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([""])
  const [isThumbnailUrl, setIsThumbnailUrl] = useState({
    isErr: false,
    errVisible: false
  });
  const [isImageUrl, setIsImageUrl] = useState({
    isErr: false,
    errVisible: false
  });

  useEffect(() => {
    if(data){
      setId(data.id)
      setTitle(data.title)
      setDescription(data.description)
      setPrice(data.price)
      setDiscount(data.discountPercentage)
      setRating(data.rating)
      setStock(data.stock)
      setBrand(data.brand)
      setCategory(data.category)
      setThumbnail(data.thumbnail)
      setImages(data.images)
    }
  }, [data])

  const onCancel = () => {
    navigate("/products");
  };

  const onIdChange = e => {
      setId(e.target.value);
  };

  const onTitleChange = (e) => {
      setTitle(e.target.value)
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  };

  const onPriceChange = (e) => {
      setPrice(e.target.value)
  };

  const onDiscountChange = (e) => {
    let value = e.target.value
    let regex = /^(\d)*(\.)?([0-9]{1})?$/
    if (regex.test(value) || value === "") {
      setDiscount(e.target.value)
    }
  };

  const onRatingChange = (e) => {
    let regex = /^(\d)*(\.)?([0-9]{1})?$/
    let value = e.target.value
    if (regex.test(value) && value <= 10) {
    setRating(e.target.value)
    }
  };

  
  const onStockChange = (e) => {
    setStock(e.target.value)
  };

  const onBrandChange = (e) => {
    setBrand(e.target.value)
  };
  
  const onCategoryChange = (e) => {
    setCategory(e.target.value)
  };
  
  const onThumbnailChange = (e) => {
    setThumbnail(e.target.value)
  };

  const onThumbnailValidateChange = (e) => {
    let value = e.target.value;
    if (URLregex().test(value)) {
      setIsThumbnailUrl({ errVisible: false, isErr: true });
    } else {
      setIsThumbnailUrl({ errVisible: true, isErr: false });
    }
  }

  const onImageChange = (e,i) => {
    let clonnedImage = [...images];
    clonnedImage[i] = e.target.value;
    setImages(clonnedImage);
  }

  const onImageValidateChange = (e) => {
    let value = e.target.value;
    if (URLregex().test(value)) {
      setIsImageUrl({ errVisible: false, isErr: true });
    } else {
      setIsImageUrl({ errVisible: true, isErr: false });
    }
  }

  const onNewImageAdd = () => {
    if(images.length <= 4) {
      const nextAdd = [
        ...images,
        ""
      ];
      setImages(nextAdd);
    }
  }

  const postPayload = {
    id: id,
    title: title,
    description: description,
    price: price,
    discountPercentage: discount,
    rating: rating,
    stock: stock,
    brand: brand,
    category: category,
    thumbnail: thumbnail,
    images: images,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
        fetch('https://dummyjson.com/products/add', {
          method: mode === "Edit" ? "PUT" : "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(postPayload),
        })
          .then((res) => {
            if (res.status === 200) {
              if(mode === "Edit"){
                alert("Product Details Updated")
              }else{
                alert("Product Added")
              }
              onCancel()
            }
          })
          .catch((err) => {
           console.log(err)
          })
    } catch (err) { console.log(err) }
  }

  return (
    <div className="lg:m-auto p-5 md:p-10">
      <p className="text-center font-semibold text-xl mb-10">
        {mode === "Edit" ? "Edit Product Here" : "Add Product Here"}
      </p>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-40">
            <div className="relative mt-5 rounded-md shadow-sm">
              <Input
                title={"Id"}
                type={"number"}
                name={"id"}
                id={"id"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Id"}
                onChange={onIdChange}
                value={id || ""}
                required={true}
              />
            </div>

            <div className="relative mt-1 rounded-md">
              <Input
                title={"Title"}
                type={"text"}
                name={"title"}
                id={"title"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Title Here"}
                onChange={onTitleChange}
                value={title|| ""}
                required={true}
              />
            </div>

            <div className=" mt-1 rounded-md">
              <Input
                title={"Description"}
                type={"text"}
                name={"Description"}
                id={"Description"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Description Here"}
                onChange={onDescriptionChange}
                value={description|| ""}
                required={true}
              />
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 justify-between">
              <div className="relative mt-1 rounded-md">
                <Input
                  title={"Price"}
                  type={"number"}
                  name={"price"}
                  id={"price"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                  placeholder={"Enter Price"}
                  onChange={onPriceChange|| ""}
                  value={price}
                  required={true}
                />
              </div>
              <div className="relative mt-1 rounded-md ">
                <Input
                  title={"Discount Percentage"}
                  type={"text"}
                  name={"discountPercentage"}
                  id={"discountPercentage"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                  placeholder={"Enter discount Percentage Here"}
                  onChange={onDiscountChange}
                  value={discount|| ""}
                  required={true}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 justify-between">
              <div className="relative mt-1 rounded-md">
                <Input
                  title={"Rating"}
                  type={"text"}
                  name={"rating"}
                  id={"rating"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                  placeholder={"Enter Rating Here"}
                  onChange={onRatingChange}
                  value={rating|| ""}
                  required={true}
                />
              </div>
              <div className="relative mt-1 rounded-md">
                <Input
                  title={"Stock"}
                  type={"number"}
                  name={"stock"}
                  id={"stock"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                  placeholder={"Enter Stock Amount Here"}
                  onChange={onStockChange}
                  value={stock|| ""}
                  required={true}
                />
              </div>
            </div>
            <div className="relative mt-1 rounded-md">
              <Input
                title={"Brand"}
                type={"text"}
                name={"brand"}
                id={"brand"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Brand name Here"}
                onChange={onBrandChange}
                value={brand|| ""}
                required={true}
              />
            </div>
            <div className="relative mt-1 rounded-md">
              <Input
                title={"Category"}
                type={"text"}
                name={"category"}
                id={"category"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Category"}
                onChange={onCategoryChange}
                value={category|| ""}
                required={true}
              />
            </div>
            <div className="relative mt-1 rounded-md">
              <Input
                title={"Thumbnail"}
                type={"text"}
                name={"thumbnail"}
                id={"thumbnail"}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                placeholder={"Enter Thumbnail URL"}
                onChange={onThumbnailChange}
                value={thumbnail|| ""}
                required={true}
                onBlur={onThumbnailValidateChange}
                isError={isThumbnailUrl.errVisible}
                errormsg={"Enter Valid URL"}
              />
            </div>
            <div className="relative mt-1 rounded-md">
            <PlusCircleIcon className="h-5 fill-violet-600 cursor-pointer mt-3 ml-1 mb-5 float-right" onClick={onNewImageAdd} />
                {
                  images?.map((el,i) => 
                  <div className="flex mb-3" key={i}>
                  <div className="flex-1">
                  <Input
                  title={`Image${i+1}`}
                  type={"text"}
                  name={"image"}
                  id={"image"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-[1.125re] mt-[0.188rem]"
                  placeholder={"Enter Image URL"}
                  onChange={(e) => onImageChange(e,i)}
                  value={el|| ""}
                  required={true}
                  onBlur={onImageValidateChange}
                  isError={isImageUrl.errVisible}
                  errormsg={"Enter Valid URL"}
                  />
                  </div>
                  
                  {
                  images.length > 1 && <MinusCircleIcon className="h-5 fill-violet-600 cursor-pointer mt-3 ml-1" onClick={() => setImages([...images].filter((el, index) => index !== i))} />
                  }
                </div>)
                  }
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
