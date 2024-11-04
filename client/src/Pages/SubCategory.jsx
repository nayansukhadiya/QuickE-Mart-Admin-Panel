import React, { useState, useEffect } from "react";
import config from "../config";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function SubCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/AllSubCategory`);
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
  }, []);

  const formatCategoryName = (category) => {
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const groupCategoriesByLetter = (categories) => {
    return categories.reduce((acc, category) => {
      const firstLetter = category.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(category);
      return acc;
    }, {});
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const groupedCategories = groupCategoriesByLetter(data);

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Categories</h1>
      <div className="">
        {Object.keys(groupedCategories).sort().map((letter) => (
          <div key={letter} className="category-group my-8">
            <h2 className="text-[24px] mb-6">{letter}</h2>
            <div className="grid grid-cols-4 gap-3">
            {groupedCategories[letter].map((category, index) => (
              <Link
                to={`/productlist?id=${category}`}
                key={category.id || index}
                className="gridItems p-5 h-32 relative rounded-xl cursor-pointer mt-4"
              >
                <p className="absolute bottom-4 text-[18px] whitespace-pre-wrap w-10">
                {formatCategoryName(category)} 
                </p>
                <img className="absolute right-3 h-40 bottom-0"  src={require(`../assets/images/sub_cat_images/${category}.png`)} />
              </Link>
            ))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategory;
