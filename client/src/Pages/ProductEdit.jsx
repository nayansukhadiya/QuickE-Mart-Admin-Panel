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
  const [formData, setFormData] = useState({
    name: "",
    pid: "",
    price: 0,
    title2: "",
    brand: "",
    img: "",
    unit: "",
    discount: "",
    mrp: 0,
    category: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data.length > 0) {
      const item = data[0];
      setFormData({
        name: item.name,
        pid: item.p_id,
        price: item.price,
        title2: item.title2,
        brand: item.brand,
        img: item.img,
        unit: item.unit,
        discount: item.discount,
        mrp: item.mrp,
        category: item.category,
        subCategory: item.sub_category,
      });
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
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now handle the form data here (e.g., send it to an API)
    console.log("Form submitted with data:", formData);

    // Example of sending the data to an API
    fetch(`${config.apiUrl}/update-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <>
      {/* <div
        className={`w-full  h-screen flex items-center justify-center PopUPSec fixed top-0 left-0`}
      >
        <div className="min-w-20 min-h-6 mainColor rounded-xl flex flex-col items-center justify-center gap-1 p-7 ">
          <p className="text-center">Are You Sure?</p>
          <div className="flex gap-3">
            <button className="secondaryBtn">No</button>
            <button className="primaryBtn">Yes</button>
          </div>
        </div>
      </div> */}
      <div>
        <h2>Preview</h2>
        <div className=" w-full">
          <div className="w-full mb-5 flex gap-4">
            <img
              className="p-2 aspect-square object-contain gridItems rounded-xl"
              src={formData.img}
              alt="img"
            />
            <table className="ProductEditTable gridItems ">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && (
                  <tr>
                    <td>Name</td>
                    <td>{data[0].name}</td>
                  </tr>
                )}
                <tr>
                  <td>PID</td>
                  <td>{data[0].p_id}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{data[0].price}</td>
                </tr>
                <tr>
                  <td>Title 2</td>
                  <td>{data[0].title2}</td>
                </tr>
                <tr>
                  <td>Brand</td>
                  <td>{data[0].brand}</td>
                </tr>
                <tr>
                  <td>Unit</td>
                  <td>{data[0].unit}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>{data[0].discount}</td>
                </tr>
                <tr>
                  <td>MRP</td>
                  <td>{data[0].mrp}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{data[0].category}</td>
                </tr>
                <tr>
                  <td>Sub-Category</td>
                  <td>{data[0].sub_category}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="ProductEditDiv">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="pid"
                    className="block mb-2 text-sm font-medium"
                  >
                    PID
                  </label>
                  <input
                    type="text"
                    id="pid"
                    name="pid"
                    value={formData.pid}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="title2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Title 2
                  </label>
                  <input
                    type="text"
                    id="title2"
                    name="title2"
                    value={formData.title2}
                    onChange={handleChange}
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="imgSrc"
                    className="block mb-2 text-sm font-medium"
                  >
                    Img Src
                  </label>
                  <input
                    type="text"
                    id="imgSrc"
                    name="imgSrc"
                    value={formData.img}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="unit"
                    className="block mb-2 text-sm font-medium"
                  >
                    Unit
                  </label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium"
                  >
                    Discount
                  </label>
                  <input
                    type="text"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="mrp"
                    className="block mb-2 text-sm font-medium"
                  >
                    MRP
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ProductEditDiv">
                  <label
                    htmlFor="subCategory"
                    className="block mb-2 text-sm font-medium"
                  >
                    Sub Category
                  </label>
                  <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
