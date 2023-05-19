import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FormProvider, FTextField } from "../../componets/form";
import { useForm } from "react-hook-form";
import { TOPIC_OPTIONS } from "../../options/option";

const defaultValues = {
  searchQuery: "",
};

function CustomerCarePage() {
  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return (
    <Box sx={{ textAlign: "center", paddingBottom: "318px" }}>
      <Box sx={{ backgroundColor: "tomato", height: "150px" }}>
        <Typography variant="h4" sx={{ color: "white", paddingTop: "10px" }}>
          Hello, DREAM shop can I help you ?
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField
            required
            name="searchQuery"
            placeholder="searchQuery"
            sx={{
              width: 450,
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingRight: "0",
              },
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
              "&:hover": { border: "none" },
              marginTop: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start" sx={{ marginRight: "0" }}>
                  <IconButton
                    type="submit"
                    sx={{
                      backgroundColor: "tomato",
                      borderRadius: "5px",
                      marginRight: "1px",
                      padding: "7px",
                      "&:hover": { backgroundColor: "tomato", opacity: 0.9 },
                    }}
                  >
                    <SearchIcon sx={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormProvider>
      </Box>

      <Typography
        variant="h5"
        sx={{ my: "20px", color: "#001c44", fontWeight: 600 }}
      >
        Topic
      </Typography>

      <Container
        sx={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {TOPIC_OPTIONS.map((option) => (
          <Box
            sx={{
              border: "1px solid #00000073",
              width: 250,
              height: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              cursor: "pointer",
              color: "#001c44",
              "&:hover": { opacity: 0.7, backgroundColor: "#f6f6f6" },
            }}
            key={option?.title}
          >
            <div>
              <img style={{ width: 100 }} src={option?.img} alt="" />
              <Typography variant="h6">{option?.title}</Typography>
            </div>
          </Box>
        ))}
      </Container>

      <Box
        sx={{
          marginTop: 3,
          backgroundColor: "tomato",
          color: "white",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h5">You still need help ?</Typography>
          <Typography>
            DREAM always support whenever you need (24/7).
          </Typography>
          <Typography>
            You can select "Chat Now" below or call the hotline 1900123456
          </Typography>
          <Button
            sx={{
              marginTop: "10px",
              background: "#001c44",
              "&:hover": {
                backgroundColor: "white",
                color: "#001c44",
                opacity: 0.9,
              },
            }}
            variant="contained"
          >
            <Typography>Chat Now</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomerCarePage;
