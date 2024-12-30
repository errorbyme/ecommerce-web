import { Avatar, IconButton, Rating } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductReviewCard = ({
  reviewItem,
  isAuthenticated,
  user,
  handleDelete,
}) => {
  const date = new Date(reviewItem?.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short", // '2-digit', 'numeric', 'short', 'long'
  });
  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            className="text-white capitalize"
            sx={{ width: 40, height: 40, bgcolor: "black" }}
          >
            {reviewItem?.userId?.fullName[0]}
          </Avatar>
          <p className="text-md font-semibold">
            {reviewItem?.userId?.fullName}
          </p>
        </div>
        <div className="flex items-center">
          {isAuthenticated && user?.email === reviewItem?.userId?.email && (
            <>
              <IconButton onClick={() => handleDelete(reviewItem)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
          <p className="opacity-50 text-xs">{formattedDate}</p>
        </div>
      </div>
      <div className="ml-14">
        <Rating
          value={reviewItem?.rating}
          name="half-rating"
          readOnly
          precision={0.5}
        />
        <p className="text-sm sm:text-base">{reviewItem?.review}</p>
      </div>
    </div>
  );
};

export default ProductReviewCard;
