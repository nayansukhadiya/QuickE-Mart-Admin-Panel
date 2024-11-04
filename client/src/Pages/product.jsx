import React, { useState, useEffect } from "react";
import config from "../config";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

function Product() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/sub_category?name=${query}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Include query in dependencies to refetch on change

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Categories: {query}</h1>
      <div className="grid grid-cols-6 gap-4">
        {data.map((product) => (
          <Link key={product.id} to={`/productedit?id=${product.p_id}`} className="gridItems rounded-xl shadow-lg p-4">
            <div className="h-[200px] flex align-center justify-center  ">
            <img
              src={product.img}
              alt={product.name}
              className=" h-[190px] object-contain"
              />
              </div>
            <h2 className="text-lg font-semibold details">{product.name}</h2>
            <h6 className="my-3">{product.brand}</h6>
            <h6 className="my-3">{product.unit}</h6>
            <p className="">₹ {product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
