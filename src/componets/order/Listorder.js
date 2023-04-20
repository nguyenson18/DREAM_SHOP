import styled from "@emotion/styled";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { statusComfim } from "../../utils/statusOrder";
import { fCurrency } from "../../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { deleteOrther } from "../../features/oderCartSlice";

const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

const Listorder = React.memo(({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteOrther = (row) => async () => {
    console.log(row);
    if (row?.status === "confirm") {
      dispatch(deleteOrther({ ortherId: row?._id }, enqueueSnackbar));
    } else
      return enqueueSnackbar("Status confirm not delete order", {
        variant: "warning",
      });
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
      </StyledTableCellBody>
      <StyledTableCellBody>{statusComfim(row?.status)}</StyledTableCellBody>
      <StyledTableCellBody>{fCurrency(row?.latestPrice)} $</StyledTableCellBody>
      <StyledTableCellBody>{fCurrency(row?.oldPrice)} $</StyledTableCellBody>
      <StyledTableCellBody>{row?.discount}%</StyledTableCellBody>
      <StyledTableCellBody>{row?.quantity}</StyledTableCellBody>
      <StyledTableCellBody>{fCurrency(row?.totalAmount)} $</StyledTableCellBody>
      <StyledTableCellBody>
        <Button sx={{ minWidth: "30px" }}>
          <RemoveRedEyeIcon sx={{ color: "#001c44" }} />
        </Button>
        <Button sx={{ minWidth: "30px" }} onClick={handleDeleteOrther(row)}>
          <DeleteIcon sx={{ color: "tomato" }} />
        </Button>
      </StyledTableCellBody>
    </TableRow>
  );
});
Listorder.displayName= 'Listorder'
export default Listorder;
