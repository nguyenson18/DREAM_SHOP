import { Button } from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function FButton({ product, handleAddToCard, ...sx }) {
  return (
    <Button
      disabled={product?.stock != "stocking"}
      sx={{
        background: "#001c44",
        width: "20%",
        "&:hover": {
          backgroundColor: "#001c44",
          color: "white",
          opacity: 0.9,
        },
        fontSize: "22px"
      }}
      {...sx}
      variant="contained"
      onClick={handleAddToCard}
    >
      <AddShoppingCartIcon />
    </Button>
  );
}

export default FButton;
