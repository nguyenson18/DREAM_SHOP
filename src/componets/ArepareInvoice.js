import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "10px 0",
  "& .css-ahj2mt-MuiTypography-root": {
    fontWeight: 550,
  },
  fontSize: "16px",
  fontWeight: 550,
});

function ArepareInvoice() {
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQuanlity, setTotalQuanlity] = useState("");
  const [totalPriceSale, setTotalPriceSale] = useState("");
  const { isLoading, listOrther } = useSelector((state) => state?.addcart);

  useEffect(() => {
    let startPrice = 0;
    let startQuanlity = 0;
    let startPriceSale = 0;
    for (let i = 0; i < listOrther?.length; i++) {
      const element = listOrther[i];
      startPrice = startPrice + +element?.latestPrice;
      startPriceSale =
        startPriceSale + (+element?.oldPrice - +element?.latestPrice);
      startQuanlity = startQuanlity + +element?.quantity;
    }
    setTotalPrice(startPrice);
    setTotalPriceSale(startPriceSale);
    setTotalQuanlity(startQuanlity);
  }, [listOrther]);

  return (
    <Box
      sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}
    >
      <Card
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          width: "350px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <StyledBox>
            <Typography>Total Product:</Typography>
            {listOrther?.length}
          </StyledBox>
          <StyledBox>
            <Typography>Total Quantity:</Typography>
            {totalQuanlity}
          </StyledBox>
          <StyledBox>
            <Typography>Total Sale:</Typography>
            {totalPriceSale} $
          </StyledBox>
          <StyledBox>
            <Typography>Total Price:</Typography>
            {totalPrice} $
          </StyledBox>
        </CardContent>
        <Divider sx={{ width: "80%", margin: "0 auto" }} />
        <CardActions>
          <Button
            size="small"
            sx={{
              backgroundColor: "tomato",
              color: "white",
              margin: "10px auto",
              "&:hover":{opacity:0.9, backgroundColor:"#001c44"},
            }}
          >
            Purchase
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ArepareInvoice;
