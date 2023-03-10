import {
  Box,
  Card,
  Checkbox,
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import GradingIcon from "@mui/icons-material/Grading";
import BallotIcon from "@mui/icons-material/Ballot";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
  color: "white",
});

function OrderPage() {
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
              <TableCell sx={{ width: "2px", padding: "10px" }}>
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root":
                      { color: "white" },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 550, color: "white" }}>
                Product
              </TableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price Sale</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Card>
    </Container>
  );
}

export default OrderPage;
