import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { capitalCase } from "change-case";
import { Box } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

function DiscountNew({ product }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        marginTop: "5px",
      }}
    >
      {product?.newProduct == "new" && (
        <span
          style={{
            height: "22px",
            minWidth: "22px",
            lineHeight: "0",
            borderRadius: "8px",
            cursor: "pointer",
            alignItems: "center",
            background:
              "linear-gradient(to left, rgb(0, 159, 255), rgb(236, 47, 75))",
            color: "white",
            padding: "0 8px",
            fontWeight: 600,
            display: "inline-flex",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
        <NewReleasesIcon sx={{ fontSize:"19px", marginRight:"2px" }} />
          {capitalCase(product?.newProduct)}
        </span>
        // <Box
        //     sx={{
        //       maxWidth: "100%",
        //       display: "inline-flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       height: "32px",
        //       color: "rgb(255, 255,255)",
        //       borderRadius: "16px",
        //       cursor: "pointer",
        //       background:
        //         "linear-gradient(to right, rgb(241, 39, 17), rgb(245, 175, 25))",
        //     }}
        //   >
        //     <NewReleasesIcon sx={{ marginLeft: "5px" }} />
        //     <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        //     {capitalCase(product?.newProduct)}
        //     </span>
        //   </Box>
      )}
      {product?.discount && (
        <>
          <span
            style={{
              height: "22px",
              minWidth: "22px",
              lineHeight: "0",
              borderRadius: "8px",
              cursor: "pointer",
              alignItems: "center",
              background:
                "linear-gradient(45deg, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89))",
              color: "white",
              padding: "0 6px",
              fontWeight: 600,
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            {product?.discount}%
            <KeyboardDoubleArrowDownIcon />
          </span>
          <span
            style={{
              height: "22px",
              minWidth: "22px",
              lineHeight: "0",
              borderRadius: "8px",
              cursor: "pointer",
              alignItems: "center",
              background:
                "linear-gradient(to right, rgb(241, 39, 17), rgb(245, 175, 25))",
              color: "white",
              padding: "0 8px",
              fontWeight: 600,
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            SALE
          </span>
        </>
      )}
      
    </div>
  );
}

export default DiscountNew;
