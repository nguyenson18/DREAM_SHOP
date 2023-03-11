import { Typography } from "@mui/material";
import React from "react";

function ProductInformation({ product, sx }) {
  return (
    <>
      {product?.authorCatego?.name == "laptop" && (
        <Typography sx={{ fontSize: "14px", ...sx }} noWrap>{`${
          product?.processor_brand || ""
        } ${product?.processor_name || ""}, ${product?.ram_type || ""} ${
          product?.ram_gb || ""
        }, ssd ${product?.ssd || ""}`}</Typography>
      )}
      {product?.authorCatego?.name == "phone" && (
        <Typography sx={{ fontSize: "14px", ...sx }} noWrap>{`${
          product?.model || ""
        }`}</Typography>
      )}
    </>
  );
}

export default ProductInformation;
