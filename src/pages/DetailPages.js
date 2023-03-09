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
import { products } from "../jsonTest/productJson";
import { fCurrency } from "../utils/numberFormat";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function DetailPages() {
  const [product, setProduct] = useState();
  const params = useParams();
  useEffect(() => {
    if (params?.id) {
      const res = products.find((e) => {
        if (params?.id == e?.id) {
          return { ...e };
        }
      });
      setProduct(res);
    }
  }, [params]);
  console.log(product);
  
  return (
    <Container sx={{ my: 5, position: "relative",paddingBottom: "400px", }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ maxWidth: "33.3333%" }}>
          <Box
            sx={{
              width: "100%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={product?.cover}
              alt="product"
              style={{
                maxWidth: "90%",
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
              // flexWrap:"wrap"
            }}
          >
            {/* {product?.images?.map((img) => (
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

        <Box sx={{ paddingLeft: "16px" }}>
          <Box
            sx={{
              maxWidth: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "32px",
              color: "rgb(255, 255,255)",
              borderRadius: "16px",
              cursor: "pointer",
              background:
                "linear-gradient(to right, rgb(241, 39, 17), rgb(245, 175, 25))",
            }}
          >
            <NewReleasesIcon sx={{ marginLeft: "5px" }} />
            <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              {product?.status}
            </span>
          </Box>

          <Typography variant="h5" paragraph>
            {product?.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              value={Number(product?.totalRating)}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ({product?.totalReview} reviews)
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {product?.priceSale && (
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  textDecoration: "line-through",
                  color: "rgb(145, 158, 171)",
                }}
              >
                {fCurrency(product?.priceSale)}
              </Typography>
            )}
            <Typography
              variant="h5"
              color="#001c44"
              style={{ marginLeft: "5px", fontWeight: 550 }}
            >
              {fCurrency(product?.price)}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Divider sx={{ borderStyle: "dashed" }} />

          <Box sx={{ my: 3 }}>
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
