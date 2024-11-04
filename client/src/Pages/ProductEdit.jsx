import React, { useState, useEffect } from "react";
import config from "../config";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

function ProductEdit() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search).get("id");

  const [name, setName] = useState('');
  const [pid, setPid] = useState('');
  const [price, setPrice] = useState(0);
  const [title2, setTitle2] = useState('');
  const [brand, setBrand] = useState('');
  const [img, setImg] = useState('');
  const [unit, setUnit] = useState('');
  const [discount, setDiscount] = useState('');
  const [mrp, setMrp] = useState(0);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const item = data[0];
      setName(item.name);
      setPid(item.pid);
      setPrice(item.price);
      setTitle2(item.title2);
      setBrand(item.brand);
      setImg(item.img);
      setUnit(item.unit);
      setDiscount(item.discount);
      setMrp(item.mrp);
      setCategory(item.category);
      setSubCategory(item.sub_category);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/pid?name=${query}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setData(result);
        console.log(result)
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <>
    <div className="">
      <h2>Preview</h2>

      <div className="flex">
        <div className="w-[20%] gridItems flex items-center justify-center rounded-xl">
          <img className="w-[80%]" src={img} alt="img"/>
        </div>
        <div className="w-80%"></div>
      </div>
    </div>
    </>
  );
}

export default ProductEdit