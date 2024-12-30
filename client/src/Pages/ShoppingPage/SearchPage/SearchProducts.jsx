import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import {
  getSearchResults,
  resetSearchResults,
} from "../../../Store/search-slice";
import Card from "../Product/Card";
import CircularProgress from "@mui/material/CircularProgress";

const SearchProducts = () => {
  const { searchResults, isLoading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center relative">
          <input
            type="search"
            className="sm:p-3 sm:ps-10 p-2 ps-10 w-full outline-slate-200 border rounded-xl"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Here..."
          />
          <SearchIcon
            fontSize="small"
            sx={{ position: "absolute", left: "10px" }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center min-h-16 p-4">
          <CircularProgress />
        </div>
      ) : (
        <>
          {!searchResults.length && (
            <div className="font-bold min-h-16 p-6">No Products</div>
          )}
          {searchResults.length > 0 && (
            <div className="w-full grid grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-8 mt-6 md:p-5">
              {searchResults.map((product, i) => (
                <Card product={product} key={i} i={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchProducts;
