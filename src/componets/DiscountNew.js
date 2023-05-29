import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { capitalCase } from "change-case";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

function DiscountNew({ product }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        marginTop: "5px",
        height: "22px",
      }}
    >
      {product?.newProduct === "new" && (
        <div
          style={{
            height: "100%",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewReleasesIcon sx={{ fontSize: "19px", marginRight: "2px" }} />
          <span>{capitalCase(product?.newProduct)}</span>
        </div>
      )}
      {product?.description?.discount !== "0" && (
        <span
          style={{
            height: "100%",
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
          {Number(product?.description?.discount)}%
          <KeyboardDoubleArrowDownIcon />
        </span>
      )}
    </div>
  );
}

export default DiscountNew;
