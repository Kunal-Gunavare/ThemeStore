import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { BASE_URL } from "../utils/constants";

const Products = ({ searchKey = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      axios.defaults.withCredentials = true;
      setIsLoading(true);
      const allProducts = await axios.get(
        `${BASE_URL}/api/v1/product/search?key=${searchKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAllProducts(allProducts.data.products);
      setIsLoading(false);
    };
    getAllProducts();
  }, [searchKey]);

  console.log(allProducts);
  return (
    <div className="container mx-auto mt-10">
      {isLoading ? (
        <div className="flex justify-center flex-row  items-center h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="mt-10 flex gap-20 justify-center  flex-wrap ">
          {allProducts.map((product, index) => (
            <div
              className="w-[380px] border bg-white rounded-lg shadow-2xl hover:shadow-slate-700 cursor-pointer"
              key={index}
            >
              <div>
                <h1 className="text-xl font-semibold p-2 cursor-pointer">
                  {product.name}
                </h1>
              </div>
              <div className="">
                <img
                  className="object-cover"
                  src={product.imageUrl}
                />
              </div>
              <div className="p-2 gap-2 flex flex-wrap">
                {product.tags.map((tag, index) => (
                  <span
                    className="text-wrap shadow-md bg-white text-sm font-semibold p-1 rounded-full cursor-pointer"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-evenly p-2">
                <Link className="flex-grow " to={`/product/${product._id}`}>
                  <button className="bg-[#7747ff] p-2 w-[100%] rounded-sm text-white font-semibold">
                    {" "}
                    ₹{product.price}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
