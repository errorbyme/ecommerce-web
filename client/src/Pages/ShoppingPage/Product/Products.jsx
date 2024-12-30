import React, { useEffect, useState } from "react";
import Card from "./Card";
import Sort from "./Sort";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Store/product-slice";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const createSearchParamsHelper = (filterparams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterparams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const Products = () => {
  const { productList, isLoading } = useSelector((state) => state.userProducts);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(getAllProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  const handleFilter = async (currentSection, currentOption) => {
    let cpyFilters = { ...filters };

    const indexOfCurrentSection =
      Object.keys(cpyFilters).indexOf(currentSection);
    if (indexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [currentSection]: [currentOption] };
    } else {
      const indexOfCurrentOption =
        cpyFilters[currentSection].indexOf(currentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[currentSection].push(currentOption);
      } else {
        cpyFilters[currentSection].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  useEffect(() => {
    const createQuery = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(createQuery));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  return (
    <div className="p-5 relative">
      <Sort sort={sort} setSort={setSort} />
      <div className="lg:flex relative w-full justify-center">
        <Filter handleFilter={handleFilter} filters={filters} />
        <div className="w-full">
          <div className="grid grid-cols-2 sm:gap-5 md:grid-cols-3 w-full md:gap-8 mt-6 md:p-5">
            {productList.map((product, i) => (
              <Card product={product} key={i} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
