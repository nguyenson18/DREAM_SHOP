import styled from "@emotion/styled";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { statusComfim } from "../../../utils/statusOrder";
import { fCurrency } from "../../../utils/numberFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { deleteOrther } from "../../../features/oderCartSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EvaluateComfirm from "./EvaluateComfirm";

const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  fontSize: "16px",
});

const Listorder = React.memo(({ row }) => {
  const [openEvaluate, setOpenEvaluate] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteOrther = (row) => async () => {
    if (row?.status === "paid") {
      dispatch(deleteOrther({ ortherId: row?._id }, enqueueSnackbar));
    } else
      return enqueueSnackbar("Status confirm not delete order", {
        variant: "warning",
      });
  };

  return (
    <>
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
              <img src={row?.imageUrl[1]} alt="" style={{ height: "80px" }} />
            </Button>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                paddingLeft: "50px",
                width: "90%",
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
          {/* <Button sx={{ minWidth: "30px" }}>
          <VisibilityIcon sx={{ color: "#001c44" }} />
        </Button> */}
          <Button
            sx={{ minWidth: "30px" }}
            onClick={() => {
              setOpenEvaluate(true);
              setId(row?.productId);
            }}
          >
            <EditNoteIcon sx={{ color: "#001c44", fontSize: "27px" }} />
          </Button>
          {row?.status === "paid" && (
            <Button sx={{ minWidth: "30px" }} onClick={handleDeleteOrther(row)}>
              <DeleteIcon sx={{ color: "tomato" }} />
            </Button>
          )}
        </StyledTableCellBody>
      </TableRow>
      <EvaluateComfirm
        open={openEvaluate}
        title={"Product reviews"}
        id={id}
        handleClose={() => {
          setOpenEvaluate(false);
        }}
      />
    </>
  );
});
Listorder.displayName = "Listorder";
export default Listorder;
