import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { fCurrency } from "../../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  checkBoxOrther,
  setQuanlityOrther,
} from "../../../features/addCartSlice";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

const ListOrtherComponent = React.memo(
  ({ row, setOpen, setContent, setOrtherId, setCheckAll }) => {
    const { listOrther } = useSelector((state) => state?.addcart);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleChangeCheckBox = (e, id) => {
      let value = e.target.checked;
      const data = listOrther?.map((e) => {
        if (e?._id === id) {
          return { ...e, check: value };
        } else return { ...e };
      });
      dispatch(checkBoxOrther(data));
      const checkAll = data.every((item) => item.check);
      setCheckAll(checkAll);
    };

    const handleQuanlity = ({ name, ortherId }) => {
      switch (name) {
        case "increase":
          return dispatch(
            setQuanlityOrther({ ortherId, quantity: 1 }, enqueueSnackbar)
          );
        case "decrease":
          return dispatch(
            setQuanlityOrther({ ortherId, quantity: -1 }, enqueueSnackbar)
          );
        default:
          break;
      }
    };

    useEffect(() => {
      const checkAll = listOrther.every((item) => item.check);
      setCheckAll(checkAll);
    }, [listOrther]);

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
              <img src={row?.imageUrl[1]} alt="" style={{ height: "80px" }} />
            </Button>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                paddingLeft: "50px",
                width: "100%",
              }}
            >
              {row?.description?.brand}
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          {fCurrency(row?.description?.latest_price)} $
        </StyledTableCell>
        <StyledTableCell>
          {fCurrency(row?.description?.old_price)} $
        </StyledTableCell>
        <StyledTableCell>{row?.discount}%</StyledTableCell>
        <StyledTableCell>
          <Button
            onClick={() =>
              handleQuanlity({
                name: "decrease",
                ortherId: row?._id,
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
              })
            }
          >
            <AddIcon sx={{ color: "tomato" }} />
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          {fCurrency(row?.description?.latest_price * row?.quantity)} $
        </StyledTableCell>
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
);
ListOrtherComponent.displayName = "ListOrtherComponent";
export default ListOrtherComponent;
