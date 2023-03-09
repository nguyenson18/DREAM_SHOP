import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { capitalCase } from "change-case";

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
          }}
        >
          {capitalCase(product?.newProduct)}
        </span>
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
              padding: "0 8px",
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
