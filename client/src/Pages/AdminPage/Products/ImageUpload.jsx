import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Skeleton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  isEditMode,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setImageFile(file);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="image-upload" className="block mb-2 font-medium">
        Image Upload
      </label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode && "opacity-50"
        } border border-dashed border-gray-400 p-4 rounded-md`}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          disabled={isEditMode}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full cursor-pointer h-24"
            role="button"
            aria-label="Click or drag an image to upload"
          >
            <CloudUploadIcon fontSize="large" color="secondary" />
            <span>Drag & drop or click to upload image</span>
          </label>
        ) : imageLoadingState ? (
          <Skeleton variant="rectangular" width={"100%"} height={100} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon fontSize="large" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <IconButton onClick={handleRemoveImage}>
              <CloseIcon />
              <span className="sr-only">Remove File</span>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
