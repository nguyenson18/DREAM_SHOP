import {
  Box,
  Card,
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
import BallotIcon from "@mui/icons-material/Ballot";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../features/oderCartSlice";
import { useSnackbar } from "notistack";
import Listorder from "./componets/Listorder";
import useAuth from "../../hooks/useAuth";
import ListBrowseProducts from "./componets/ListBrowseProducts";
import { getListBrowsProduct } from "../../features/browseProducts";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
  color: "white",
});

function OrderPage() {
  const { listOrder } = useSelector((state) => state?.ordercart);
  const { listBrowseProducts } = useSelector((state) => state?.browseproduct);
  const { role } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(getOrder(enqueueSnackbar));
    if (role == "master") {
      dispatch(getListBrowsProduct(enqueueSnackbar));
    }
  }, []);
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
        <BallotIcon sx={{ fontSize: "40px", marginRight: "5px" }} />
        <Typography variant="h5">Order</Typography>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#001c44" }}>
              <TableCell sx={{ fontWeight: 550, color: "white" }}>
                Product
              </TableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price Sale</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {role !== "master" &&
              listOrder?.map((row) => <Listorder key={row._id} row={row} />)}
            {role == "master" &&
              listBrowseProducts?.map((row) => {
                if (row?.ortherItems?.length) {
                  return row?.ortherItems?.map((item) => (
                    <ListBrowseProducts key={item?._id} row={item} userId={row?.userId}/>
                  ));
                }
              })}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

export default OrderPage;
