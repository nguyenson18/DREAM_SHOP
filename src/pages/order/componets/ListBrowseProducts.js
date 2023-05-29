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
import { useDispatch } from "react-redux";
import { browsProduct } from "../../../features/browseProducts";
import { useSnackbar } from "notistack";

const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

function ListBrowseProducts({ row }) {
  const dispatch = useDispatch();
  const isDisabled = row?.status !== "paid";
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (data) => {
    let dataOrthersId = [];
    dataOrthersId.push({ _id: data?._id });
    dispatch(browsProduct({ dataOrthers: dataOrthersId }, enqueueSnackbar));
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
        {!isDisabled && (
          <IconButton onClick={() => handleSubmit(row)}>
            <OfflinePinIcon
              style={{ color: "rgb(46, 125, 50)", fontSize: "25px" }}
            />
          </IconButton>
        )}
      </StyledTableCellBody>
    </TableRow>
  );
}

export default ListBrowseProducts;
