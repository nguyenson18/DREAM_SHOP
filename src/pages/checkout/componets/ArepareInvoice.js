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
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fCurrency } from "../../../utils/numberFormat";
import DialogInformation from "./DialogInformation";
import PaymentIcon from "@mui/icons-material/Payment";

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

const ArepareInvoice = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQuanlity, setTotalQuanlity] = useState("");
  const [totalPriceSale, setTotalPriceSale] = useState("");
  const [totalProduct, setTotalProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const { listOrther } = useSelector((state) => state?.addcart);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let startPrice = 0;
    let startQuanlity = 0;
    let startPriceSale = 0;
    let totalProducts = [];
    for (let i = 0; i < listOrther?.length; i++) {
      const element = listOrther[i];
      if (element.check === true) {
        totalProducts.push(element);
        startPrice = startPrice + +element?.description?.latest_price;
        startPriceSale =
          startPriceSale +
          (+element?.description?.old_price -
            +element?.description?.latest_price) *
            +element?.quantity;
        startQuanlity = startQuanlity + +element?.quantity;
      }
    }
    setTotalPrice(startPrice);
    setTotalPriceSale(startPriceSale);
    setTotalQuanlity(startQuanlity);
    setTotalProduct(totalProducts);
  }, [listOrther]);

  const handleClose = () => {
    setOpen(false);
  };

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
            {totalProduct?.length}
          </StyledBox>
          <StyledBox>
            <Typography>Total Quantity:</Typography>
            {totalQuanlity}
          </StyledBox>
          <StyledBox>
            <Typography>Total Sale:</Typography>
            {fCurrency(totalPriceSale)} $
          </StyledBox>
          <StyledBox>
            <Typography>Total Price:</Typography>
            {fCurrency(totalPrice)} $
          </StyledBox>
        </CardContent>
        <Divider sx={{ width: "80%", margin: "0 auto" }} />
        <CardActions>
          <Button
            size="small"
            sx={{
              backgroundColor: "tomato",
              width: "120px",
              color: "white",
              margin: "10px auto",
              "&:hover": { opacity: 0.9, backgroundColor: "#001c44" },
            }}
            onClick={() => {
              if (!totalProduct?.length) {
                enqueueSnackbar("Please choose a product", {
                  variant: "warning",
                });
              } else if (!listOrther.length) {
                enqueueSnackbar("No products", { variant: "warning" });
              } else {
                setOpen(true);
              }
            }}
          >
            <PaymentIcon sx={{ marginRight: "5px" }} /> PAYMENT
          </Button>
        </CardActions>
      </Card>
      <DialogInformation
        open={open}
        handleClose={handleClose}
        title={"Information"}
      />
    </Box>
  );
};

export default ArepareInvoice;
