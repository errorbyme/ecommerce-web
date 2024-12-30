import React, { useEffect } from "react";
import MainCarousel from "./MainCarousel";
import HomeSectionCarousel from "./HomeSectionCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../../Store/product-slice";
import CircularProgress from "@mui/material/CircularProgress";

const category = [
  { id: "men" },
  { id: "women" },
  { id: "kids" },
  { id: "accessories" },
  { id: "footwear" },
];

const Home = () => {
  const dispatch = useDispatch();
  const { productListByCategory, isLoading } = useSelector(
    (state) => state.userProducts
  );

  useEffect(() => {
    category.forEach((c) => dispatch(getProductsByCategory(c.id)));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 mt-10">
        {productListByCategory &&
          Object.keys(productListByCategory).map((category) => (
            <HomeSectionCarousel
              category={productListByCategory[category]}
              section={category}
              key={category}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
