import { Typography } from "@mui/material";
import React from "react";

function ProductInformation({ product, sx }) {
  return (
    <>
      {product?.authorCatego?.name == "laptop" && (
        <Typography {...sx} noWrap>{`${product?.description?.model || ""} ${
          product?.processor_name || ""
        }, ${product?.ram_type || ""} ${product?.description?.ram_gb || ""}, ${
          product?.description?.ssd || ""
        }`}</Typography>
      )}
      {product?.authorCatego?.name == "phone" && (
        <Typography {...sx} noWrap>{`${
          product?.description?.model || ""
        }`}</Typography>
      )}
      {product?.authorCatego?.name == "camera" && (
        <Typography {...sx} noWrap>{`${
          product?.description?.model || ""
        }`}</Typography>
      )}
      {product?.authorCatego?.name == "watch" && (
        <Typography {...sx} noWrap>{`${product?.model || ""}`}</Typography>
      )}
      {product?.authorCatego?.name == "headphone" && (
        <Typography {...sx} noWrap>{`${product?.model || ""}`}</Typography>
      )}
      {product?.authorCatego?.name == "chair" && (
        <Typography {...sx} noWrap>{`${product?.model || ""}`}</Typography>
      )}
      {product?.authorCatego?.name == "speaker" && (
        <Typography {...sx} noWrap>{`${product?.model || ""}`}</Typography>
      )}
    </>
  );
}

export default ProductInformation;
