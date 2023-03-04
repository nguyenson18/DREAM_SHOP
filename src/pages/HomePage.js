import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FormProvider, FTextField } from "../componets/form";
import FSelect from "../componets/form/FSelect";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import SortIcon from "@mui/icons-material/Sort";
import AlertMsg from "../componets/AlertMsg";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

function HomePage() {
  const [sort, setSort] = useState("");
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
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ width: "25%" }}>
        <Card sx={{ maxWidth: "100%", textAlign: "center" }}>
          <Button variant="outlined" startIcon={<ClearAllIcon />}>
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
      </Stack>
    </Container>
  );
}

export default HomePage;
