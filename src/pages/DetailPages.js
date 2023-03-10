import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fCurrency } from "../utils/numberFormat";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProduct } from "../features/productSlice";
import ProductInformation from "../componets/ProductInformation";
import { useSnackbar } from "notistack";
import DiscountNew from "../componets/DiscountNew";

function DetailPages() {
  const [product, setProduct] = useState();
  const { productDetail } = useSelector((state) => state.product);
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    const productId = params?.id;
    if (params?.id) {
      dispatch(getDetailProduct({ productId }, enqueueSnackbar));
    }
  }, [params]);

  return (
    <Container sx={{ my: 5, position: "relative", paddingBottom: "400px" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ width: "33.3333%" }}>
          <Box
            sx={{
              width: "100%",
              height: "385px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={productDetail?.imageUrl}
              alt="productDetail"
              style={{
                borderRadius: "10px",
                maxWidth: "100%",
                height: "100%",
                transition:
                  "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, hover 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* {productDetail?.images?.map((img) => (
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(255, 255, 255",
                  color: "rgb(33, 43, 54",
                  transition:
                    "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  borderRadius: "8px",
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
                  overflow: "hidden",

                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "80%",
                    cursor: "pointer",
                    backgroundSize: "cover",
                  }}
                />
              </Card>
            ))} */}
          </Box>
        </Box>

        <Box
          sx={{
            marginLeft: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems:"end"
          }}
        >
          <Box>
            <DiscountNew product={productDetail} />

            <Typography variant="h4" paragraph>
              {` ${productDetail?.authorBrand?.brand} ${productDetail?.processor_name} `}
            </Typography>

            <ProductInformation
              sx={{ fontSize: "18px" }}
              product={productDetail}
            />

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2, my: 2 }}
            >
              <Rating
                value={Number(productDetail?.ratings)}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ({product?.totalReview} reviews)
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {productDetail?.old_price != "0" && (
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textDecoration: "line-through",
                    color: "rgb(110, 109, 109)",
                  }}
                >
                  {fCurrency(productDetail?.old_price)}
                </Typography>
              )}
              <Typography
                variant="h5"
                color="#001c44"
                style={{ marginLeft: "5px", fontWeight: 550 }}
              >
                {fCurrency(productDetail?.latest_price)}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Divider sx={{ borderStyle: "dashed" }} />
          </Box>

          <Box>
            <Button
              sx={{
                background: "#001c44",
                "&:hover": {
                  backgroundColor: "#001c44",
                  color: "white",
                  opacity: 0.9,
                },
              }}
              variant="contained"
            >
              <AddShoppingCartIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default DetailPages;
