import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import BlankLayout from "../layouts/BlankLayout";
import NotFoundPage from "../pages/NotFoundPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderPage from "../pages/OrderPage";
import CustomerCarePage from "../pages/CustomerCarePage";
import DetailPages from "../pages/DetailPages";
import AccountPages from "../pages/AccountPages";
import AuthRequire from "./AuthRequire";

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
