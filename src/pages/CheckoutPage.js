import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBoxOrther,
  deleteOrther,
  getOther,
  setQuanlityOrther,
} from "../features/addCartSlice";
import { useSnackbar } from "notistack";
import { FCheckbox } from "../componets/form";
import { fCurrency } from "../utils/numberFormat";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ArepareInvoice from "../componets/ArepareInvoice";
import Dailogconfim from "../componets/form/Dailogconfim";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function CheckoutPage() {
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [ortherId, setOrtherId] = useState()
  const { isLoading, listOrther } = useSelector((state) => state?.addcart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeCheckBox = (e, id) => {
    let value = e.target.checked;
    const data = listOrther?.map((e) => {
      if (e?._id == id) {
        return { ...e, check: value };
      } else return { ...e };
    });
    dispatch(checkBoxOrther(data));
  };

  const handleQuanlity = ({ name, ortherId, quantity }) => {
    let newQuantity = +quantity;
    if (name == "increase") {
      const quanlityCover = newQuantity + 1;
      newQuantity = quanlityCover;
    } else if (name == "decrease") {
      const quanlityCover = newQuantity - 1;
      newQuantity = quanlityCover;
    }
    dispatch(
      setQuanlityOrther({ ortherId, quantity: newQuantity }, enqueueSnackbar)
    );
  };
  const handleDelete = () => {
    dispatch(deleteOrther({ ortherId }, enqueueSnackbar));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // CheckAll
  useEffect(() => {
    if (checkAll == true) {
      const data = listOrther?.map((e) => {
        return { ...e, check: checkAll };
      });
      dispatch(checkBoxOrther(data));
    } else {
      const data = listOrther?.map((e) => {
        return { ...e, check: checkAll };
      });
      dispatch(checkBoxOrther(data));
    }
  }, [checkAll]);

  //CheckAll

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
              <TableCell sx={{ width: "60px", padding: "10px" }}>
                <Checkbox
                  sx={{
                    "&.Mui-checked": { color: "tomato" },
                  }}
                  checked={checkAll}
                  onChange={(e) => setCheckAll(e.target.checked)}
                />
              </TableCell>
              <TableCell
                sx={{ fontWeight: 550, fontSize: "16px", width: "35%" }}
              >
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
            {listOrther?.map((row) => (
              <TableRow key={row._id} sx={{ height: "100px" }}>
                <TableCell sx={{ width: "2px", padding: "10px" }}>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": { color: "tomato" },
                    }}
                    checked={row?.check}
                    onChange={(e) => handleChangeCheckBox(e, row?._id)}
                  />
                </TableCell>

                <StyledTableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "100%",
                  }}
                >
                  <img src={row?.imageUrl} alt="" style={{ height: "70px" }} />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      paddingLeft: "50px",
                    }}
                  >
                    {row?.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  {fCurrency(row?.latestPrice)} $
                </StyledTableCell>
                <StyledTableCell>{fCurrency(row?.oldPrice)} $</StyledTableCell>
                <StyledTableCell>{row?.discount}%</StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() =>
                      handleQuanlity({
                        name: "decrease",
                        ortherId: row?._id,
                        quantity: row?.quantity,
                      })
                    }
                  >
                    <RemoveIcon sx={{ color: "tomato" }} />
                  </Button>
                  {row?.quantity}
                  <Button
                    onClick={() =>
                      handleQuanlity({
                        name: "increase",
                        ortherId: row?._id,
                        quantity: row?.quantity,
                      })
                    }
                  >
                    <AddIcon sx={{ color: "tomato" }} />
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  {fCurrency(row?.totalAmount)} $
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setContent(row?.name);
                      setOrtherId(row?._id)
                    }}
                  >
                    <DeleteIcon sx={{ color: "tomato" }} />
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Button
        sx={{
          backgroundColor: "tomato",
          color: "white",
          my: 2,
          "&:hover": { opacity: 0.9, backgroundColor: "#001c44" },
        }}
      >
        <DeleteSweepIcon />
      </Button>
      <ArepareInvoice />
      <Dailogconfim
        open={open}
        title={"Do you want to delete this product?"}
        content={content}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </Container>
  );
}

export default CheckoutPage;
