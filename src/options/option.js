import { Divider } from "@mui/material";

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "new", label: "Newest" },
  { value: "high-low", label: "Price: High-Low" },
  { value: "low-high", label: "Price: Low-High" },
];
export const RATING_OPTIONS = [
  { value: 1, title: "Useless" },
  { value: 2, title: "Poor" },
  { value: 3, title: "Ok" },
  { value: 4, title: "Good" },
  { value: 5, title: "Excellent" },
];
export const TOPIC_OPTIONS = [
  {
    img: "https://img.alicdn.com/imgextra/i3/O1CN010jbrSM1uZroFlwaxQ_!!6000000006052-55-tps-64-64.svg",
    title: "My account",
  },
  {
    img: "https://img.alicdn.com/tfs/TB1nwn8rTM11u4jSZPxXXahcXXa-72-72.png",
    title: "Refund",
  },
  {
    img: "https://img.alicdn.com/imgextra/i3/O1CN01einRAZ25B6AD0ynwM_!!6000000007487-55-tps-64-64.svg",
    title: "Coupons & Discounts",
  },
  {
    img: "https://img.alicdn.com/imgextra/i2/O1CN01oYZnh91zhig0wxXid_!!6000000006746-55-tps-64-64.svg",
    title: "Returns",
  },
  {
    img: "https://img.alicdn.com/imgextra/i3/O1CN01AmwFeL1KNCgp9uCQU_!!6000000001151-55-tps-64-64.svg",
    title: "Delivery & Pick up",
  },
  {
    img: "https://img.alicdn.com/imgextra/i1/O1CN01g4H4HF1mNwZVIs1W9_!!6000000004943-55-tps-64-64.svg",
    title: "Pay",
  },
  {
    img: "https://img.alicdn.com/imgextra/i1/O1CN01DVrT3t1cuKQ1zQg2J_!!6000000003660-55-tps-64-64.svg",
    title: "Personal Data Security",
  },
  {
    img: "https://img.alicdn.com/imgextra/i3/O1CN01VNRHwE1ONtkk00tKv_!!6000000001694-55-tps-64-64.svg",
    title: "Buyer Policy",
  },
  {
    img: "https://img.alicdn.com/imgextra/i4/O1CN01coooYw28x8YNiZ573_!!6000000007998-55-tps-64-64.svg",
    title: "Other Topics",
  },
];
export const LIST_OPTIONS_NAV = [
  {
    value: "Home",
    role: ["master", "normal"],
    navigateValue: "/",
    line: (
      <Divider
        orientation="vertical"
        style={{ height: "30px", margin: "0 10px" }}
      />
    ),
  },
  {
    value: "Checkout",
    role: ["normal"],
    navigateValue: "/checkout",
    line: (
      <Divider
        orientation="vertical"
        style={{ height: "30px", margin: "0 10px" }}
      />
    ),
  },
  {
    value: "Order",
    role: ["normal", "master"],
    navigateValue: "/order",
    line: (
      <Divider
        orientation="vertical"
        style={{ height: "30px", margin: "0 10px" }}
      />
    ),
  },
  {
    value: "CustomerCare",
    role: ["normal"],
    navigateValue: "/customrcare",
    line: (
      <Divider
        orientation="vertical"
        style={{ height: "30px", margin: "0 10px" }}
      />
    ),
  },
  {
    value: "CreateProduct",
    role: ["master"],
    navigateValue: "/createproduct",
  },
];
