import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import { checkBoxOrther, getOther } from "../features/addCartSlice";
import { useSnackbar } from "notistack";
import { FCheckbox } from "../componets/form";
import { fCurrency } from "../utils/numberFormat";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize:"16px"
});

function CheckoutPage() {
  const { isLoading, listOrther } = useSelector((state) => ({
    listOrther: state?.addcart?.listOrther,
    isLoading: state?.addcart?.isLoading,
  }));
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(getOther(enqueueSnackbar));
  }, []);

  const handleChangeCheckBox = (e, id) => {
    let value = e.target.checked
    const data = listOrther.map((e) => {
      if(e?._id == id){
        return {...e, check: value}
      }else return {...e}
    })
    dispatch(checkBoxOrther(data))
  }
  console.log(listOrther)
  return (
    <Container sx={{ paddingBottom: "400px" }}>
      <Box
        sx={{
          display: "center",
          alignItems: "center",
          justifyContent: "",
          width: "100px",
          height: "40px",
          padding: "12px 16px",
          borderRadius: "10px",
          color: "tomato",
          backgroundColor: "rgba(237, 50, 56, 0.08)",
          my: 2,
        }}
      >
        <LocalMallIcon sx={{ fontSize: "40px", marginRight: "5px" }} />
        <Typography variant="h5">Cart</Typography>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "2px", padding: "10px" }}>
                <Checkbox
                  sx={{
                    "&.Mui-checked": { color: "tomato" },
                  }}
                 
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 550 , fontSize:"16px", width:"35%"}}>Product</TableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price Sale</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOrther?.map((row) => (
              <TableRow key={row._id}>
                <TableCell sx={{ width: "2px", padding: "10px" }}>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": { color: "tomato" },
                    }}
                    checked={row?.check}
                    onChange={(e)=>handleChangeCheckBox(e, row?._id)}
                  />
                </TableCell>
                <StyledTableCell sx={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                  <img src={row?.imageUrl} alt="" style={{ width: "50px" }} />
                  <Typography sx={{fontSize:"16px", fontWeight:500, paddingLeft:"50px"}}>{row?.name}</Typography>
                </StyledTableCell>
                <StyledTableCell>{fCurrency(row?.price)}</StyledTableCell>
                <StyledTableCell>{}</StyledTableCell>
                <StyledTableCell>{row?.quanlity}</StyledTableCell>
                <StyledTableCell>{}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <Card
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            width: "350px",
            height: "400px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <CardContent></CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ backgroundColor: "tomato", color: "white" }}
            >
              Purchase
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
