import {
  Box,
  Button,
  Card,
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
import GradingIcon from "@mui/icons-material/Grading";
import BallotIcon from "@mui/icons-material/Ballot";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/oderCartSlice";
import { useSnackbar } from "notistack";
import { fCurrency } from "../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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
  console.log(listOrder);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrder(enqueueSnackbar));
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
            <TableRow sx={{ backgroundColor: "tomato" }}>
              <TableCell sx={{ fontWeight: 550, color: "white" }}>
                Product
              </TableCell>
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
              <TableRow key={row._id} sx={{ height: "100px" }}>
                <StyledTableCellBody>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Button
                      onClick={() => navigate(`/products/${row?.productId}`)}
                    >
                      <img
                        src={row?.imageUrl}
                        alt=""
                        style={{ height: "80px" }}
                      />
                    </Button>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        paddingLeft: "50px",
                        width: "100%",
                      }}
                    >
                      {row?.name}
                    </Typography>
                  </Box>
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {fCurrency(row?.latestPrice)} $
                </StyledTableCellBody>
                <StyledTableCellBody>
                  {fCurrency(row?.oldPrice)} $
                </StyledTableCellBody>
                <StyledTableCellBody>{row?.discount}%</StyledTableCellBody>
                <StyledTableCellBody>{row?.quantity}</StyledTableCellBody>
                <StyledTableCellBody>
                  {fCurrency(row?.totalAmount)} $
                </StyledTableCellBody>
                <StyledTableCellBody>
                  <Button sx={{ minWidth: "30px" }}>
                    <RemoveRedEyeIcon sx={{color:"#001c44"}} />
                  </Button>
                  <Button sx={{ minWidth: "30px" }} onClick={() => {}}>
                    <DeleteIcon sx={{ color: "tomato" }} />
                  </Button>
                </StyledTableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

export default OrderPage;
