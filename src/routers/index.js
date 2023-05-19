import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import NotFoundPage from "../pages/notfound";
import OrderPage from "../pages/order";
import CustomerCarePage from "../pages/customercare";
import DetailPages from "../pages/DetailPages";
import AuthRequire from "./AuthRequire";
import CreateProduct from "../pages/crearteproduct";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import AccountPages from "../pages/account";
import CheckoutPage from "../pages/checkout";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="customrcare" element={<CustomerCarePage />} />
        <Route path="account" element={<AccountPages />} />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="products/:id" element={<DetailPages />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
