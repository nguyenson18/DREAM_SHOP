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
      <CardActionArea onClick={() => navigate(`/products/${product._id}`)}>
        <Box sx={{ padding: "10px" }}>
          <DiscountNew product={product}/>

          <CardMedia
            sx={{ borderRadius: "5px", margin:"auto", width:"75%" }}
            component="img"
            height="190"
            image={product?.imageUrl}
            alt={product?.authorBrand?.brand}
          />
        </Box>
      </CardActionArea>

      <CardContent sx={{ padding: "10px !important" }}>
        <Typography sx={{fontWeight:500}} gutterBottom variant="body" component="div" noWrap>
          {`${product?.authorCatego?.name} ${product?.authorBrand?.brand} ${product?.processor_name} ${product?.model}`}
        </Typography>
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
            {product?.old_price && (
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
