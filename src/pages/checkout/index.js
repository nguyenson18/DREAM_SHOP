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
import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import { checkBoxOrther, deleteOrther } from "../../features/addCartSlice";
import { useSnackbar } from "notistack";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Dailogconfim from "../../componets/form/Dailogconfim";
import ArepareInvoice from "./componets/ArepareInvoice";
import { ListOrtherComponent } from "./componets";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function CheckoutPage() {
  const [checkAll, setCheckAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [ortherId, setOrtherId] = useState();
  const { listOrther } = useSelector((state) => state?.addcart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleChangeCheckAll = (e) => {
    const checkAll = e?.target?.checked;
    setCheckAll(e.target.checked);
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
  };
  const handleDelete = () => {
    dispatch(deleteOrther({ ortherId }, enqueueSnackbar));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container sx={{ 
      paddingBottom: "400px",
      minHeight: "100vh",
      mt: 3,
      maxWidth: "1500px !important",
      }}>
      <Box
        sx={{
          display: "flex",
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
                  onChange={(e) => handleChangeCheckAll(e)}
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
              <ListOrtherComponent
                key={row._id}
                row={row}
                setCheckAll={setCheckAll}
                setContent={setContent}
                setOpen={setOpen}
                setOrtherId={setOrtherId}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* <Button
        sx={{
          backgroundColor: "tomato",
          color: "white",
          my: 2,
          "&:hover": { opacity: 0.9, backgroundColor: "#001c44" },  
        }}
      >
        <DeleteSweepIcon />
      </Button> */}
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
