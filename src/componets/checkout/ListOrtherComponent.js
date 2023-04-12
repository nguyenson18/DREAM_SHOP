import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { fCurrency } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { checkBoxOrther, setQuanlityOrther } from "../../features/addCartSlice";
import { useNavigate } from "react-router-dom";
import DialogInformation from "../DialogInformation";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function ListOrtherComponent({ row ,setOpen, setContent,setOrtherId, setCheckAll }) {
  const { listOrther } = useSelector((state) => state?.addcart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChangeCheckBox = (e, id) => {
    let value = e.target.checked;
    const data = listOrther?.map((e) => {
      if (e?._id == id) {
        return { ...e, check: value };
      } else return { ...e };
    });
    dispatch(checkBoxOrther(data));
    const checkAll = data.every((item) => item.check);
    setCheckAll(checkAll);
  };

  const handleQuanlity = ({ name, ortherId, quantity }) => {
    let newQuantity = +quantity;
    if (name === "increase") {
      const quanlityCover = newQuantity + 1;
      newQuantity = quanlityCover;
    } else if (name === "decrease") {
      const quanlityCover = newQuantity - 1;
      newQuantity = quanlityCover;
    }
    dispatch(
      setQuanlityOrther({ ortherId, quantity: newQuantity }, enqueueSnackbar)
    );
  };

  
  return (
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
      <StyledTableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Button onClick={() => navigate(`/products/${row?.productId}`)}>
            <img src={row?.imageUrl} alt="" style={{ height: "80px" }} />
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
      </StyledTableCell>
      <StyledTableCell>{fCurrency(row?.latestPrice)} $</StyledTableCell>
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
      <StyledTableCell>{fCurrency(row?.totalAmount)} $</StyledTableCell>
      <StyledTableCell>
        <Button
          onClick={() => {
            setOpen(true);
            setContent(row?.name);
            setOrtherId(row?._id);
          }}
        >
          <DeleteIcon sx={{ color: "tomato" }} />
        </Button>
      </StyledTableCell>
    </TableRow>
  );
}

export default ListOrtherComponent;
