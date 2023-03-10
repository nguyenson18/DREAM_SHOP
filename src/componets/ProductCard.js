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
import DiscountNew from "./DiscountNew";
import ProductInformation from "./ProductInformation";
import { capitalCase } from "change-case";
import FButton from "./form/FButton";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleAddToCard = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    }
  };
  return (
    <Card sx={{ width: 280, height: 420, borderRadius: "10px" }}>
      <CardActionArea onClick={() => navigate(`/products/${product._id}`)}>
        <Box sx={{ padding: "10px" }}>
          <DiscountNew product={product} />

          <CardMedia
            sx={{ borderRadius: "5px", margin: "auto", width: "75%" }}
            component="img"
            height="190"
            image={product?.imageUrl}
            alt={product?.authorBrand?.brand}
          />
        </Box>
      </CardActionArea>

      <CardContent sx={{ padding: "10px !important" }}>
        <Typography
          onClick={() => navigate(`/products/${product._id}`)}
          sx={{ fontWeight: 500, cursor: "pointer" }}
          gutterBottom
          variant="body"
          component="div"
          noWrap
        >
          {`${capitalCase(product?.authorBrand?.brand || "")} ${
            product?.model || ""
          } ${product?.processor_name || ""} `}
        </Typography>
        <ProductInformation sx={{height:"21px", fontSize: "14px"}} product={product} />
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ display: "block" }}
        >
          <Rating
            name="read-only"
            value={Number(product?.ratings)}
            readOnly
            size="small"
            sx={{ my: 0.5 }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {product?.old_price !== "0" && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through", color: "text.disabled" }}
              >
                {fCurrency(product?.old_price)}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="#001c44"
              style={{ marginLeft: "5px", fontWeight: 600, fontSize: "16px" }}
            >
              {fCurrency(product?.latest_price)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", padding: "10px" }}>
        <FButton product={product} handleAddToCard={handleAddToCard}>
          <AddShoppingCartIcon sx={{ fontSize: "22px" }} />
        </FButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
