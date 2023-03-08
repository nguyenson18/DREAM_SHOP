import { Container, createTheme, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import LogoWhite from "../componets/LogoWhite";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Pay from "../img/paypal.png";
import MasterCard from "../img/mastercard.png";
import Visa from "../img/visa.png";
import Discover from "../img/discover.png";
import American from "../img/american.png";

const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

function MainFooter() {
  return (
    <Box
      style={{
        backgroundColor: "#001c44",
        color: "white",
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
            Thành lập từ năm 2021, Dream là nền tảng thương mại điện tử hàng đầu
            Đông Nam Á, tiên phong thúc đẩy sự phát triển tại khu vực thông qua
            Thương mại & Công nghệ. Hiện nay, với nền tảng logistics và hệ thống
            thanh toán lớn nhất khu vực, Dream trở thành một phần trong đời sống
            của người tiêu dùng và hướng đến mục tiêu phục vụ cho 300 triệu
            khách hàng trên toàn khu vực Đông Nam Á vào năm 2030.
          </Typography>
          <br />
          <Typography style={{ width: "400px", fontSize: "14px" }}>
            Tại Việt Nam, Dream là nền tảng Thương mại điện tử quen thuộc của
            hàng triệu người tiêu dùng bởi sự đa dạng hàng đầu về chủng loại sản
            phẩm, ứng dụng công nghệ mua sắm và giải trí thông minh cùng khả
            năng logistics
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
              <Typography>Email</Typography>
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
