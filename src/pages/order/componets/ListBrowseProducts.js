import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { statusComfim } from "../../../utils/statusOrder";
import { fCurrency } from "../../../utils/numberFormat";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch } from "react-redux";
import { browsProduct } from "../../../features/browseProducts";
import { useSnackbar } from "notistack";
import useAuth from "../../../hooks/useAuth"

const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function ListBrowseProducts({ row, userId }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const isDisabledPaid = row?.status !== "paid";
  const isDisableConfirmed = row?.status !== "confirmed"
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (data) => {
    let datas = [];
    const status = row?.status == 'paid' ? "confirmed" : "delivery"
    try {
      datas.push({ _id: data?._id, status: status, userId: userId});
      dispatch(browsProduct({ dataOrthers: datas }, enqueueSnackbar));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
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
          <Button onClick={() => {}}>
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
            {row?.description?.brand}
          </Typography>
        </Box>
      </StyledTableCellBody>
      <StyledTableCellBody>{statusComfim(row?.status)}</StyledTableCellBody>
      <StyledTableCellBody>
        {fCurrency(row?.description?.latest_price)} $
      </StyledTableCellBody>
      <StyledTableCellBody>
        {fCurrency(row?.description?.old_price)} $
      </StyledTableCellBody>
      <StyledTableCellBody>{row?.description?.discount}%</StyledTableCellBody>
      <StyledTableCellBody>{row?.quantity}</StyledTableCellBody>
      <StyledTableCellBody>
        {fCurrency(row?.description?.latest_price * row?.quantity)} $
      </StyledTableCellBody>
      <StyledTableCellBody>
        {!isDisabledPaid && (
          <IconButton onClick={() => handleSubmit(row)}>
            <OfflinePinIcon
              style={{ color: "rgb(46, 125, 50)", fontSize: "25px" }}
            />
          </IconButton>
        )}
         {!isDisableConfirmed && (
          <IconButton onClick={() => handleSubmit(row)}>
            <LocalShippingIcon
              style={{ color: "tomato", fontSize: "25px" }}
            />
          </IconButton>
        )}
        
      </StyledTableCellBody>
    </TableRow>
  );
}

export default ListBrowseProducts;
