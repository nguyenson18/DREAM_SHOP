import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils/numberFormat";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleAddToCard = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    }
  };
  return (
    <Card sx={{ width: 280, height: 400 }}>
      <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
        <Box sx={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              marginTop: "5px",
            }}
          >
            <span
              style={{
                height: "22px",
                minWidth: "22px",
                lineHeight: "0",
                borderRadius: "8px",
                cursor: "pointer",
                alignItems: "center",
                background:
                  "linear-gradient(to left, rgb(0, 159, 255), rgb(236, 47, 75))",
                color: "white",
                padding: "0 8px",
                fontWeight: 600,
                display: "inline-flex",
                justifyContent: "center",
              }}
            >
              NEW
            </span>
            <span
              style={{
                height: "22px",
                minWidth: "22px",
                lineHeight: "0",
                borderRadius: "8px",
                cursor: "pointer",
                alignItems: "center",
                background:
                  "linear-gradient(45deg, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89))",
                color: "white",
                padding: "0 8px",
                fontWeight: 600,
                display: "inline-flex",
                justifyContent: "center",
              }}
            >
              6%
              <KeyboardDoubleArrowDownIcon />
            </span>
            <span
              style={{
                height: "22px",
                minWidth: "22px",
                lineHeight: "0",
                borderRadius: "8px",
                cursor: "pointer",
                alignItems: "center",
                background:
                  "linear-gradient(to right, rgb(241, 39, 17), rgb(245, 175, 25))",
                color: "white",
                padding: "0 8px",
                fontWeight: 600,
                display: "inline-flex",
                justifyContent: "center",
              }}
            >
              SALE
            </span>
          </div>

          <CardMedia
            sx={{ borderRadius: "5px" }}
            component="img"
            height="190"
            image={product.cover}
            alt={product.name}
          />
        </Box>
      </CardActionArea>
      <CardContent sx={{ padding: "10px !important" }}>
        <Typography gutterBottom variant="body" component="div" noWrap>
          {product.name}
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ display: "block" }}
        >
          <Rating name="read-only" value={3.5} readOnly size="small" sx={{my: 0.5}}/>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", color: "text.disabled" }}
            >
              {fCurrency(product.priceSale)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginLeft: "5px", fontWeight: 600, fontSize: "16px" }}
            >
              {fCurrency(product.price)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          sx={{
            background: "#001c44",
            "&:hover": {
              backgroundColor: "tomato",
              color: "white",
              opacity: 0.8,
            },
          }}
          variant="contained"
          onClick={handleAddToCard}
        >
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
