import { useEffect, useState } from "react";
import { Button, IconButton, Rating, Skeleton } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../Store/product-slice";
import TelegramIcon from "@mui/icons-material/Telegram";
import { addToCart } from "../../../Store/cart-slice";
import { toast } from "react-toastify";
import {
  addReview,
  deleteReview,
  getAllReviews,
} from "../../../Store/review-slice";
import GradeIcon from "@mui/icons-material/Grade";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductDetails() {
  const { productDetails, isLoading: productLoader } = useSelector(
    (state) => state.userProducts
  );
  const { reviewList } = useSelector((state) => state.userReview);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.userCarts);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { cartItems } = useSelector((state) => state.userCarts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const totalRating =
    reviewList && reviewList.length > 0
      ? reviewList.reduce(
          (sum, reviewItem) => sum + (reviewItem?.rating || 0),
          0
        )
      : 0;

  const averageRating =
    reviewList && reviewList.length > 0 && totalRating
      ? (totalRating / reviewList.length).toFixed(1)
      : 0;

  useEffect(() => {
    dispatch(getProduct(params.productId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviews(params.productId));
  }, [dispatch]);

  useEffect(() => {
    if (productDetails && productDetails?.colors)
      setSelectedColor(productDetails?.colors[0]);
    if (productDetails && productDetails?.sizes)
      setSelectedSize(productDetails?.sizes[0]);
  }, [productDetails]);

  const handleAddToCart = () => {
    let getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === params.productId
      );
      if (indexOfCurrentItem > -1) {
        const getquantity = getCartItems[indexOfCurrentItem].quantity;
        if (getquantity + 1 > productDetails?.totalStock) {
          toast.warn(`only ${getquantity} quantity can be added`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId: params.productId,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload.message);
      } else {
        toast.warn(data?.payload.message);
      }
    });
  };

  const handleReview = () => {
    dispatch(
      addReview({
        userId: user.id,
        productId: params.productId,
        review: review,
        rating: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllReviews(params.productId));
        toast.success(data?.payload.message);
        setRating(1);
        setReview("");
      } else {
        setReview("");
        setRating(1);
        toast.warn(data?.payload.message);
      }
    });
  };

  const handleDelete = async (reviewItem) => {
    dispatch(deleteReview({ reviewId: reviewItem._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllReviews(params.productId));
        toast.success(data?.payload.message);
      } else {
        toast.warn(data?.payload.message);
      }
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white px-2 sm:px-5 lg:px-14">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 pt-10">
            {/* Image gallery */}
            <div className="flex overflow-hidden max-w-full  flex-col items-center border">
              {productLoader ? (
                <Skeleton width={"30rem"} height={"100%"} />
              ) : (
                <img
                  alt={productDetails?.title}
                  src={productDetails?.image}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              )}
            </div>

            {/* Product info */}
            <div className="lg:col-span-1 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 border">
              {productLoader ? (
                <Skeleton width={"100%"} height={"2.5rem"} />
              ) : (
                <h1 className="text-lg font-bold text-gray-700 mt-3">
                  {!productLoader && productDetails?.title}
                </h1>
              )}

              {/* price */}
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex gap-2 lg:text-lg text-gray-600">
                  {productLoader && <Skeleton width={"100%"} height={"2rem"} />}

                  {!productLoader && productDetails?.salePrice > 0 && (
                    <p className="opacity-90">₹{productDetails?.salePrice}</p>
                  )}
                  <p
                    className={`${
                      productDetails?.salePrice > 0 && "line-through opacity-70"
                    } font-semibold`}
                  >
                    {!productLoader && "₹" + productDetails?.price}
                  </p>
                </div>

                {/* Reviews */}

                {productLoader ? (
                  <Skeleton width={"100%"} height={"2.5rem"} />
                ) : (
                  <div className="mt-2 flex items-center space-x-3">
                    <Rating
                      name="simple-controlled"
                      value={Number(averageRating) || 0}
                      precision={0.1}
                      readOnly
                    />
                    <p className="flex flex-col items-center">
                      <span className="text-md flex items-center font-medium">
                        {averageRating} <GradeIcon fontSize="small" />
                      </span>
                      <span className="text-xs opacity-60">
                        {totalRating} rating
                      </span>
                    </p>
                  </div>
                )}

                <form className="mt-2">
                  {/* select size  */}

                  <div className="mb-5">
                    <h3 className="text-sm font-medium text-gray-900">
                      Available sizes are :
                    </h3>
                    {productLoader && (
                      <Skeleton width={"100%"} height={"4rem"} />
                    )}
                    <div className="grid grid-cols-5 gap-4 sm:grid-cols-5 lg:grid-cols-6 my-3">
                      {!productLoader &&
                        productDetails &&
                        productDetails?.sizes &&
                        productDetails?.sizes.length > 0 &&
                        productDetails?.sizes.map((size, i) => (
                          <div
                            className={`${
                              size === selectedSize && "border-red-700"
                            } cursor-pointer bg-white text-gray-900 border-2 shadow-sm group relative flex items-center justify-center rounded-md px-1 text-[12px] sm:text-xs font-medium uppercase py-1 hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-2`}
                            key={i}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* select color  */}

                  <div className="mb-5">
                    <h3 className="text-sm font-medium text-gray-900">
                      Available colors are :
                    </h3>
                    {productLoader && (
                      <Skeleton width={"100%"} height={"4rem"} />
                    )}
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-4 my-3">
                      {!productLoader &&
                        productDetails &&
                        productDetails?.colors &&
                        productDetails?.colors.length > 0 &&
                        productDetails?.colors.map((color, i) => (
                          <div
                            className={`${
                              color === selectedColor && "border-blue-500"
                            } cursor-pointer bg-white text-gray-900 border-2 shadow-sm group relative flex items-center justify-center rounded-md px-1 text-[12px] sm:text-xs font-medium uppercase py-1 hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-2`}
                            key={i}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 sm:text-xs font-bold">
                    {productDetails?.totalStock === 0 ? (
                      <span className="text-red-900">Out of stocks</span>
                    ) : (
                      productDetails?.totalStock <= 10 && (
                        <span className="text-orange-600">
                          Only {productDetails?.totalStock} left
                        </span>
                      )
                    )}
                  </div>

                  <div className="w-40">
                    <Button
                      variant="contained"
                      disabled={
                        !isAuthenticated ||
                        isLoading ||
                        productDetails?.totalStock === 0
                      }
                      onClick={handleAddToCart}
                      fullWidth
                    >
                      {isLoading ? (
                        <CircularProgress size={25} />
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              {productLoader && <Skeleton width={"100%"} height={"8rem"} />}

              {/* Description and details */}
              <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-6 pt-2 pb-2 lg:pt-6">
                <p className="text-base font-medium text-gray-700">
                  {productDetails?.description}
                </p>
              </div>
            </div>
          </div>
        </nav>
        {/* Reviews */}
        <section className=" px-2 md:px-5 pt-8 ">
          <h1 className="font-semibold text-xl pb-4">Recent Review & rating</h1>
          <div className="border sm:p-5 p-2 max-h-[300px] overflow-y-scroll">
            <div className="space-Fy-5">
              {reviewList &&
                reviewList.length > 0 &&
                reviewList.map((reviewItem, i) => (
                  <ProductReviewCard
                    reviewItem={reviewItem}
                    key={i}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
          <div className="mt-5">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={!isAuthenticated}
            />
            <div className="w-full relative">
              <textarea
                name=""
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="p-2 border-2 w-full outline-none"
                placeholder="Write Your Review.."
                disabled={!isAuthenticated}
              ></textarea>
              <IconButton
                disabled={!isAuthenticated}
                onClick={handleReview}
                sx={{ position: "absolute", right: 5, bottom: 5 }}
              >
                <TelegramIcon color="primary" />
              </IconButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
