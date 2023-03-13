import {
  Box,
  Button,
  Card,
  CardActions,
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
import LocalMallIcon from "@mui/icons-material/LocalMall";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 550,
});

function CheckoutPage() {
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
              <TableCell sx={{ width: "2px", padding: "10px" }}>
                <Checkbox
                  sx={{
                    "&.Mui-checked": { color: "tomato" },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 550 }}>Product</TableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Price Sale</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Card>

      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <Card
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            width: "350px",
            height: "400px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <CardActions>
            <Button
              size="small"
              sx={{ backgroundColor: "tomato", color: "white" }}
            >
              Purchase
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
