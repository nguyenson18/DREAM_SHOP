import { Typography } from "@mui/material";
import React from "react";

function ProductInformation({ product }) {
  return (
    <>
      {product?.authorCatego?.name == "laptop" && (
        <Typography
          sx={{ fontSize: "14px" }}
        >{`${product?.processor_brand} ${product?.processor_name}, ${product?.ram_type} ${product?.ram_gb}, ssd ${product?.ssd}`}</Typography>
      )}
      {product?.authorCatego?.name == "phone" && (
        <Typography sx={{ fontSize: "14px" }} noWrap>{`${product?.model}`}</Typography>
      )}
    </>
  );
}

export default ProductInformation;
