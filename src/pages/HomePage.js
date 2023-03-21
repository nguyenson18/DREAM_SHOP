import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FormProvider, FTextField } from "../componets/form";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import SortIcon from "@mui/icons-material/Sort";
import ProductList from "../componets/ProductList";

import { RATING_OPTIONS, SORT_OPTIONS } from "../options/option";
import CollapseFilter from "../componets/CollapseFilter";
import { useDispatch, useSelector } from "react-redux";
import { filterBrandProduct, getAllProducts } from "../features/productSlice";
import LoadingScreen from "../componets/LoadingScreen";
import { useSnackbar } from "notistack";

function HomePage() {
  const [price, setPrice] = useState([0, 100]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("default");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [rating, useRating] = useState(0);
  const [page, setPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, products, totalPages } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  const methods = useForm({});
  const {
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (brand) {
      dispatch(
        filterBrandProduct(
          {
            category,
            search,
            brand: brand,
            type: type == "default" ? "" : type,
            page,
          },
          enqueueSnackbar
        )
      );
    } else {
      dispatch(
        getAllProducts(
          { search, type: type == "default" ? "" : type, page },
          enqueueSnackbar
        )
      );
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    // if ((search && !brand) || (type && !brand)) {
    //   dispatch(
    //     getAllProducts(
    //       { search, type: type == "default" ? "" : type, page },
    //       enqueueSnackbar
    //     )
    //   );
    // } else {
      dispatch(
        filterBrandProduct(
          {
            category,
            search,
            brand: brand,
            type: type == "default" ? "" : type,
            page,
          },
          enqueueSnackbar
        )
      );
    // }
  }, [search, type, brand]);

  const handleChangeSelect = (e) => {
    setType(e.target.value);
  };
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const handleClickClear = () => {
    setPage(1);
    setCategory("");
    setBrand("");
    setType("default");
    setSearch("");
  };

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        mt: 3,
        position: "relative",
        paddingBottom: "400px",
        maxWidth: "1500px !important",
      }}
    >
      <Stack sx={{ marginRight: "24px", width: 300 }}>
        <Card sx={{ width: 250, textAlign: "center", padding: "10px" }}>
          <CollapseFilter
            search={search}
            setBrand={setBrand}
            setCategory={setCategory}
            type={type}
          />
          <Divider />
          <Box>
            <Typography sx={{ marginTop: "10px", fontWeight: 600 }}>
              Price
            </Typography>
            <Slider
              getAriaLabel={() => "Money range"}
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
              key={rating?.value}
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
              color: "tomato",
            }}
            variant="outlined"
            startIcon={<ClearAllIcon sx={{ color: "tomato" }} />}
            onClick={handleClickClear}
          >
            Clear All
          </Button>
        </Card>
      </Stack>

      <Stack sx={{ flexGrow: 1, position: "relative" }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
        >
          <TextField
            name="searchQuery"
            sx={{ width: 180 }}
            size="small"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            InputProps={{
              endAdornment: (
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
                value={type}
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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <ProductList products={products} />
            <Pagination
              sx={{
                my: 2,
                "& .css-wjh20t-MuiPagination-ul": { justifyContent: "center" },
              }}
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default HomePage;
