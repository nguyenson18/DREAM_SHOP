import {
  Box,
  Button,
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
import { deleteOrther, getOrder } from "../features/oderCartSlice";
import { useSnackbar } from "notistack";
import { fCurrency } from "../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { statusComfim } from "../utils/statusOrder";
import Listorder from "../componets/order/Listorder";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
  color: "white",
});
const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function OrderPage() {
  const { listOrder } = useSelector((state) => state?.ordercart);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrder(enqueueSnackbar));
  }, []);

  const handleDeleteOrther = (row) => async () => {
    console.log(row);
    if (row?.status === "confirm") {
      dispatch(deleteOrther({ ortherId: row?._id }, enqueueSnackbar));
    }else return enqueueSnackbar("Status confirm not delete order", { variant:'warning' });
  };
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
            <TableRow sx={{ backgroundColor: "tomato" }}>
              <TableCell sx={{ fontWeight: 550, color: "white", width:'35%' }}>
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
            {listOrder?.map((row) => (
              <Listorder key={row._id} row={row}/>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

export default OrderPage;
