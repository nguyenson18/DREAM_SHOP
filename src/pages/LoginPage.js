import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Card,
  Container,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import LogoWhite from "../componets/LogoWhite";
import "./Login.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RegisterPage from "./componets/RegisterComponet";
import ReserPasswordPage from "./componets/ReserPasswordComponet";
import { capitalCase } from "change-case";
import LoginComponet from "./componets/LoginComponet";
import Logo from "../componets/Logo";

function LoginPage() {
  const [currentTab, setCurrentTab] = useState("LOGIN");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "LOGIN",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <LoginComponet setCurrentTab={setCurrentTab} />,
    },
    {
      value: "REGISTER",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <RegisterPage setCurrentTab={setCurrentTab} />,
    },
    {
      value: "RESER PASSWORD",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <ReserPasswordPage setCurrentTab={setCurrentTab} />,
    },
  ];

  return (
    <div className="img">
      <div style={{ textAlign: "center" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <Logo sx={{ width: "100px" }} />
        </IconButton>
        <Card
          sx={{
            maxWidth: 450,
            minHeight: 300,
            backgroundColor: "white",
            margin: "0 auto ",
            borderRadius: "15px",
          }}
        >
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
            style={{ marginBottom: "15px" }}
            sx={{"& .css-1aquho2-MuiTabs-indicator":{backgroundColor:"#001c44"}}}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                style={{ width: "33.33%", color: "#001c44" }}
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
