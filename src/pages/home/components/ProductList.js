import { Box } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function ProductList() {
  const { products } = useSelector(
    (state) => state.product
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        my: 2,
      }}
    >
      {products.map((product) => (
        <Box key={product?._id} sx={{ my: 2 }}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
}

export default ProductList;
