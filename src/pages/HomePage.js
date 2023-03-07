import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Rating,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FormProvider, FTextField } from "../componets/form";
import FSelect from "../componets/form/FSelect";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import SortIcon from "@mui/icons-material/Sort";
import { useSnackbar } from "notistack";
import ProductList from "../componets/ProductList";
import { products } from "../jsonTest/productJson";

import { RATING_OPTIONS, SORT_OPTIONS } from "../options/option";
import CollapseFilter from "../componets/CollapseFilter";

function HomePage() {
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState([0, 100]);
  const [rating, useRating] = useState(0);

  const methods = useForm({});
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const handleChangeSelect = (e) => {
    setSort(e.target.value);
  };
  const handleChangePrice = (event, newValue) => {
    console.log(event, newValue);
    setPrice(newValue);
  };
  const handleChangeClear = () => {

  }
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ paddingRight: "24px", width: 270 }}>
        <Card sx={{ maxWidth: "100%", textAlign: "center", padding: "10px" }}>
          <CollapseFilter />
          <Divider />
          <Box>
            <Typography sx={{ marginTop: "10px", fontWeight: 600 }}>
              Price
            </Typography>
            <Slider
              aria-label="Volume"
              sx={{
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                color: "#001c44",
              }}
              value={price}
              onChange={handleChangePrice}
            />
          </Box>
          <Divider />

          <Typography sx={{ marginTop: "10px", fontWeight: 600 }}>
            Rating
          </Typography>

          {RATING_OPTIONS.map((rating) => (
            <Button
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Rating name="simple-controlled" value={rating?.value} readOnly />
              <Typography sx={{ color: "#001c44" }}>{rating?.title}</Typography>
            </Button>
          ))}
          <Button
            sx={{
              marginTop: "15px",
              width: "100%",
              border: " 1px solid tomato ",
              color:"tomato"
            }}
            variant="outlined"
            startIcon={<ClearAllIcon sx={{color:"tomato"}} />}
            onChange={handleChangeClear}
          >
            Clear All
          </Button>
        </Card>
      </Stack>

      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="flex-end"
          >
            <FTextField
              name="searchQuery"
              sx={{ width: 180 }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <FormControl size="small">
                <InputLabel
                  id="demo-select-small"
                  sx={{ display: "flex", color: "black" }}
                >
                  <SortIcon />
                  Sort
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort"
                  onChange={handleChangeSelect}
                  sx={{ width: 150, height: 40 }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </FormProvider>
        <ProductList products={products} />
      </Stack>
    </Container>
  );
}

export default HomePage;
