import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils/numberFormat";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleAddToCard = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    }
  };
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={product.cover}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div" noWrap>
            {product.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", color: "text.disabled" }}
            >
              {fCurrency(product.priceSale)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end", alignItems: "end" }}>
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
          Add to Card
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
