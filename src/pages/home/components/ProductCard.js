import {
  Box,
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
import useAuth from "../../../hooks/useAuth";
import { fCurrency } from "../../../utils/numberFormat";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DiscountNew from "../../../componets/DiscountNew";
import ProductInformation from "./ProductInformation";
import { capitalCase } from "change-case";
import FButton from "../../../componets/form/FButton";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { addToCart } from "../../../features/addCartSlice";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const isDisabled = auth?.role === "master";
  // const {} = useSelector((state) => state.addcart)
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddToCard = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCart({ productId: product._id }, enqueueSnackbar));
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
            image={product?.imageUrl[1]}
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
          {`${capitalCase(product?.authorCatego?.name || "")} ${
            product?.authorBrand?.brand || ""
          }`}
        </Typography>
        <ProductInformation
          sx={{ height: "21px", fontSize: "14px" }}
          product={product}
        />
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ display: "block" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="read-only"
              precision={0.5}
              value={Number(product?.ratings)}
              readOnly
              size="small"
              sx={{ my: 0.5, mr: "5px" }}
            />
            <Typography fontSize={"15px"}>
              ({product?.reviews?.length})
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {product?.old_price !== "0" && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through", color: "text.disabled" }}
              >
                {fCurrency(product?.description?.old_price)} $
              </Typography>
            )}
            <Typography
              variant="body2"
              color="#001c44"
              style={{ marginLeft: "5px", fontWeight: 600, fontSize: "16px" }}
            >
              {fCurrency(product?.description?.latest_price)} $
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", padding: "10px" }}>
        <FButton
          disabled={isDisabled}
          product={product}
          handleAddToCard={handleAddToCard}
        >
          <AddShoppingCartIcon sx={{ fontSize: "22px" }} />
        </FButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
