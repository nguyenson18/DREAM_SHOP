import { Container, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Pay from "../img/paypal.png";
import MasterCard from "../img/mastercard.png";
import Visa from "../img/visa.png";
import Discover from "../img/discover.png";
import American from "../img/american.png";
import { LogoWhite } from "../componets/logo";

const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

function MainFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "#001c44",
        color: "white",
        position: "absolute",
        bottom: "0px",
        width: "100%",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 15,
          marginBottom: 12,
        }}
      >
        <div>
          <LogoWhite sx={{ width: "50px" }} />
          <Typography
            sx={{ width: "400px", fontSize: "14px", marginTop: "5px" }}
          >
            Established in 2021, Dream is the leading e-commerce platform
            Southeast Asia, pioneering development in the region through Trade &
            Technology. Currently, with platform and system logistics Largest
            payment in the region, Dream to be a part of life of users and aims
            to serve 300 million VND customers across Southeast Asia by 2030.
          </Typography>
          <br />
          <Typography style={{ width: "400px", fontSize: "14px" }}>
            In Vietnam, Dream is a familiar e-commerce platform of millions of
            consumers by the leading variety of products products, smart
            shopping and entertainment technology applications and logistics
            skills
          </Typography>
        </div>

        <div>
          <Typography variant="h6" sx={{ color: "tomato" }}>
            Our Company
          </Typography>
          <StyledDiv sx={{ marginTop: "5px" }}>
            <Typography>Delivery</Typography>
            <Typography>Legal Notice</Typography>
          </StyledDiv>
          <StyledDiv>
            <Typography>About us</Typography>
            <Typography>Sucure payment</Typography>
          </StyledDiv>
          <StyledDiv>
            <Typography>Our stores</Typography>
            <Typography>Sitemap</Typography>
          </StyledDiv>
          <StyledDiv>
            <Typography>My Account</Typography>
            <Typography>Contact us</Typography>
          </StyledDiv>
          <StyledDiv sx={{ marginTop: "5px" }}>
            <img src={Pay} alt="pay pal" />
            <img
              src={MasterCard}
              alt="master card"
              style={{ margin: "0 2px" }}
            />
            <img src={Visa} alt="visa" />
            <img src={Discover} alt="dicover" style={{ margin: "0 2px" }} />
            <img src={American} alt="american" />
          </StyledDiv>
        </div>

        <div>
          <Typography variant="h6" sx={{ color: "tomato" }}>
            Contact Us
          </Typography>

          <StyledDiv sx={{ justifyContent: "start", marginTop: "5px" }}>
            <EmailIcon sx={{ marginRight: "15px", cursor: "pointer" }} />
            <div>
              <Typography sx={{}}>Email</Typography>
              <Typography>dreamvn@gmail.com</Typography>
            </div>
          </StyledDiv>

          <StyledDiv sx={{ justifyContent: "start" }}>
            <CallIcon sx={{ marginRight: "15px", cursor: "pointer" }} />
            <div>
              <Typography>Call Us</Typography>
              <Typography>+91 123456789</Typography>
            </div>
          </StyledDiv>

          <StyledDiv sx={{ justifyContent: "start" }}>
            <LocationOnIcon sx={{ marginRight: "15px", cursor: "pointer" }} />
            <div>
              <Typography>Address</Typography>
              <Typography>313, Sliver business pont VN</Typography>
            </div>
          </StyledDiv>
        </div>
      </Container>
    </Box>
  );
}

export default MainFooter;
