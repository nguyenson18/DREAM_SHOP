import {
  Avatar,
  Box,
  Card,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fCurrency } from "../utils/numberFormat";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProduct } from "../features/productSlice";
import { useSnackbar } from "notistack";
import DiscountNew from "../componets/DiscountNew";
import FButton from "../componets/form/FButton";
import LoadingScreen from "../componets/LoadingScreen";
import useAuth from "../hooks/useAuth";
import { addToCart } from "../features/addCartSlice";
import { ProductInformation } from "./home/components";

function DetailPages() {
  const [urlImg, setUrlImg] = useState("");
  const { isLoading, productDetail } = useSelector((state) => state.product);
  const params = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    const productId = params?.id;
    if (params?.id) {
      dispatch(getDetailProduct({ productId }, enqueueSnackbar));
    }
  }, [params]);
  const handleAddToCard = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCart({ productId: params?.id }, enqueueSnackbar));
    }
  };
  useEffect(() => {
    if (productDetail?.imageUrl) {
      setUrlImg(productDetail?.imageUrl[1]);
    }
  }, [productDetail]);
  
  return (
    <>
      {isLoading ? (
        <Box sx={{ position: "relative", marginTop: "100px" }}>
          <LoadingScreen />
        </Box>
      ) : (
        <Container sx={{ my: 5, position: "relative", paddingBottom: "400px" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-beween",
            }}
          >
            <Box sx={{ width: "33.3333%" }}>
              <Card
                sx={{
                  width: "100%",
                  height: "370px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={urlImg}
                  alt="productDetail"
                  style={{
                    borderRadius: "10px",
                    height: "90%",
                    transition:
                      "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, hover 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  }}
                />
              </Card>
            </Box>

            <Box
              sx={{
                maxWidth: "60%",
                marginLeft: "70px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <Box>
                <DiscountNew product={productDetail} />

                <Typography variant="h4" paragraph>
                  {` ${productDetail?.authorBrand?.brand || ""} ${
                    productDetail?.model || ""
                  } ${productDetail?.processor_name || ""} `}
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
                    ({productDetail?.reviews?.length} reviews)
                  </Typography>
                </Stack>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {productDetail?.old_price != "0" && (
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{
                        textDecoration: "line-through",
                        color: "rgb(110, 109, 100)",
                      }}
                    >
                      {fCurrency(productDetail?.description?.old_price)} $
                    </Typography>
                  )}
                  <Typography
                    variant="h5"
                    color="#001c44"
                    style={{ marginLeft: "10px", fontWeight: 550 }}
                  >
                    {fCurrency(productDetail?.description?.latest_price)} $
                  </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Divider sx={{ borderStyle: "dashed" }} />
              </Box>

              <Box>
                <FButton
                  product={productDetail}
                  handleAddToCard={handleAddToCard}
                >
                  <AddShoppingCartIcon />
                </FButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {productDetail?.imageUrl?.map((element, index) => (
              <Card
                style={{
                  width: "80px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100px",
                  textAlign: "center",
                  margin: "0 5px",
                }}
                key={index}
                onClick={() => {
                  setUrlImg(productDetail?.imageUrl[index]);
                }}
              >
                <img
                  src={element}
                  alt="productDetail"
                  style={{
                    borderRadius: "10px",
                    width: "90%",
                    transition:
                      "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, hover 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  }}
                />
              </Card>
            ))}
          </Box>
          <Box>
            <Card
              sx={{
                width: "100%",
                minHeight: "150px",
                display: "flex",
                marginTop: "15px",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <p
                style={{ margin: "10px 15px", fontSize: "", fontWeight: "500" }}
              >
                {productDetail?.reviews?.length} reviews
              </p>
              {productDetail?.reviews?.map((item) => (
                <Box sx={{ width: "100%", margin: "10px", display: "flex" }} key={item?._id}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Card
                    sx={{
                      width: "90%",
                      padding: "10px",
                      ml: "10px",
                    }}
                  >
                    <Box>
                      <Rating
                        value={Number(item?.rating)}
                        precision={0.5}
                        readOnly
                      />
                      <Typography>{item.content}</Typography>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Card>
          </Box>
        </Container>
      )}
    </>
  );
}

export default DetailPages;
