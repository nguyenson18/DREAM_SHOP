import { Box, Grid } from '@mui/material'
import React from 'react'
import ProductCard from "./ProductCard"

function ProductList({products}) {
  return (
    <Box container sx={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", my:2}}>
      {products.map((product) => (
        <Box item key={product.id}sx={{my:2}} >
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  )
}

export default ProductList