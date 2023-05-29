import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Slider,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { RATING_OPTIONS, SORT_OPTIONS } from "../../options/option";
import CollapseFilter from "./components/CollapseFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBrandProduct,
  getAllProducts,
} from "../../features/productSlice";
import LoadingScreen from "../../componets/LoadingScreen";
import { useSnackbar } from "notistack";
import styled from "@emotion/styled";
import { ProductList } from "./components";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { resfreshData } from "../../features/addCartSlice";

const StyledSlider = styled(Slider)({
  width: "100%",
  marginTop: "10px",
  marginBottom: "10px",
  color: "#001c44",
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#001c44",
    borderRadius: "7px",
  },
});

function valueLabelFormat(value) {
  const units = "$";
  return `${value} ${units}`;
}

function HomePage() {
  const [leftToggle, setLeftToggle] = useState(false);
  const [price, setPrice] = useState([0, 340000]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("default");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, products, totalPages } = useSelector(
    (state) => state.product
  );

  const getAll = () => {
    dispatch(
      getAllProducts(
        {
          category,
          search,
          type: type == "default" ? "" : type,
          price: price,
          rating: rating,
          page: 1,
        },
        enqueueSnackbar
      )
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resfreshData());
  }, []);

  useEffect(() => {
    if (brand !== "") {
      dispatch(
        filterBrandProduct(
          {
            category,
            search,
            brand: brand,
            type: type == "default" ? "" : type,
            price: price,
            rating: rating,
            page,
          },
          enqueueSnackbar
        )
      );
    } else {
      getAll();
    }
  }, [page, search, type, brand]);

  const handleChangeSelect = (e) => {
    setPage(1);
    setType(e.target.value);
  };
  const handleChangePrice = (event, newValue) => {
    setPage(1);
    setPrice(newValue);
  };
  const handleClickClear = () => {
    setPage(1);
    setCategory("");
    setBrand("");
    setType("default");
    setSearch("");
  };
  const toggleDrawer = (open) => (event) => {
    setLeftToggle(open);
  };
  const onSubmit = () => {
    setPage(1);
    if (brand) {
      dispatch(
        filterBrandProduct(
          {
            category,
            search,
            brand: brand,
            type: type == "default" ? "" : type,
            price: price,
            page,
          },
          enqueueSnackbar
        )
      );
    } else {
      getAll();
    }
  };

  const renderMobile = (
    <SwipeableDrawer
      anchor="left"
      open={leftToggle}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box sx={{ margin: "22px" }}>
        <Button onClick={toggleDrawer(false)} sx={{ color: "black" }}>
          <ChevronLeftIcon />
        </Button>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <Typography>
              Start: <span style={{ fontWeight: 500 }}>{price[0]}$</span>
            </Typography>
            <Typography>
              End: <span style={{ fontWeight: 500 }}>{price[1]}$</span>
            </Typography>
          </Box>
          <StyledSlider
            getAriaLabel={() => "Money range"}
            value={price}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay="auto"
            max={340000}
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
      </Box>
    </SwipeableDrawer>
  );

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
        <Card
          sx={{
            width: 250,
            textAlign: "center",
            padding: "10px",
            display: { xs: "none", sm: "block" },
          }}
        >
          <CollapseFilter
            setBrand={setBrand}
            setCategory={setCategory}
            setPage={setPage}
            brand={brand}
          />
          <Divider />
          <Box>
            <Typography sx={{ marginTop: "10px", fontWeight: 600 }}>
              Price
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Typography>
                Start: <span style={{ fontWeight: 500 }}>{price[0]}$</span>
              </Typography>
              <Typography>
                End: <span style={{ fontWeight: 500 }}>{price[1]}$</span>
              </Typography>
            </Box>
            <StyledSlider
              getAriaLabel={() => "Money range"}
              value={price}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="auto"
              max={340000}
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
              onClick={() => setRating(rating?.value)}
            >
              <Rating name="simple-controlled"  value={rating?.value} readOnly />
              <Typography sx={{ color: "#001c44" }}>{rating?.title}</Typography>
            </Button>
          ))}
          <Button
            style={{
              backgroundColor: "#001c44",
              width: "100%",
              marginTop: "5px",
            }}
            onClick={onSubmit}
          >
            <ManageSearchIcon style={{ fontSize: "30px", color: "tomato" }} />
          </Button>
          <Button
            sx={{
              marginTop: "7px",
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
          direction={{ xs: "row", sm: "row" }}
          justifyContent="flex-end"
          alignItems="end"
        >
          {/* is mobile */}
          <Button
            sx={{
              display: {
                xs: "block",
                sm: "none",
                position: "fixed",
                left: "20px",
                color: "tomato",
              },
            }}
            onClick={toggleDrawer(!leftToggle)}
          >
            <FormatAlignJustifyIcon />
          </Button>
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
        ) : products.length ? (
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
        ) : (
          <div>
            <Typography variant="h6">No products found</Typography>
          </div>
        )}
      </Stack>
      {renderMobile}
    </Container>
  );
}

export default HomePage;
