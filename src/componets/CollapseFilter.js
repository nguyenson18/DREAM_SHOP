import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import ComputerIcon from "@mui/icons-material/Computer";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CameraIcon from "@mui/icons-material/Camera";
import WatchIcon from "@mui/icons-material/Watch";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ChairIcon from "@mui/icons-material/Chair";
import SpeakerIcon from "@mui/icons-material/Speaker";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import React, { useEffect, useState } from "react";
import Lenovo from "../img/lenovo.png";
import Dell from "../img/dell.png";
import Asus from "../img/asus.png";
import Acer from "../img/acer.png";
import Apple from "../img/apple.png";
import Samsung from "../img/samsung.png";
import Xiaomi from "../img/xiaomi.png";
import Huawei from "../img/huawei.png";
import Sony from "../img/sony.png";

function CollapseFilter() {
  const [open, setOpen] = useState(true);
  const [listCategory, setListCategory] = useState();

  useEffect(() => {
    setListCategory(LISTCATERGORY_OPTIONS);
  }, []);

  const LISTCATERGORY_OPTIONS = [
    {
      value: "Computer",
      icon: <ComputerIcon />,
      open: false,
      brands: [
        {
          value: "Lenovo",
          icon: <img style={{ width: "50px" }} src={Lenovo} alt="lenovo" />,
        },
        {
          value: "Dell",
          icon: <img style={{ width: "40px" }} src={Dell} alt="dell" />,
        },
        {
          value: "Asus",
          icon: <img style={{ width: "40px" }} src={Asus} alt="asus" />,
        },
        {
          value: "Acer",
          icon: <img style={{ width: "40px" }} src={Acer} alt="acer" />,
        },
        {
          value: "Apple",
          icon: <img style={{ width: "40px" }} src={Apple} alt="Apple" />,
        },
      ],
    },
    {
      value: "Headphone",
      icon: <HeadphonesIcon />,
      open: false,
      brands: [
        {
          value: "Samsung",
          icon: <img style={{ width: "50px" }} src={Samsung} alt="Samsung" />,
        },
        {
          value: "Dell",
          icon: <img style={{ width: "40px" }} src={Dell} alt="dell" />,
        },
        {
          value: "Xiaomi",
          icon: <img style={{ width: "40px" }} src={Xiaomi} alt="Xiaomi" />,
        },
        {
          value: "Huawei",
          icon: <img style={{ width: "40px" }} src={Huawei} alt="Huawei" />,
        },
        {
          value: "Sony",
          icon: <img style={{ width: "40px" }} src={Sony} alt="Sony" />,
        },
      ],
    },
    { value: "Camera", icon: <CameraIcon /> },
    { value: "Watch", icon: <WatchIcon /> },
    { value: "Phone", icon: <PhoneIphoneIcon /> },
    { value: "Chair", icon: <ChairIcon /> },
    { value: "Speaker", icon: <SpeakerIcon /> },
    { value: "Otherhouses", icon: <OtherHousesIcon /> },
  ];

  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpenExpand = (event) => {
    const res = listCategory.map((e) => {
      if (e && event == e?.value) {
        return { ...e, open: !e?.open };
      } else return e;
    });
    setListCategory(res);
  };
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        paddingBottom: "10px",
      }}
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText
          sx={{
            "& .css-10hburv-MuiTypography-root": { fontWeight: 600 },
          }}
          primary="Category"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listCategory?.map((option) => (
            <>
              <ListItemButton
                key={option?.value}
                sx={{ pl: 4 }}
                onClick={() => handleOpenExpand(option?.value)}
              >
                <ListItemIcon>{option?.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    "& .css-10hburv-MuiTypography-root": { fontWeight: 600 },
                  }}
                  primary={option?.value}
                />
                {option?.brands &&
                  (option?.open ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={option?.open} timeout="auto" unmountOnExit>
                {option?.brands?.map((brand) => (
                  <ListItemButton
                    key={brand?.value}
                    sx={{ pl: 4, display: "flex", justifyContent: "center" }}
                    onClick={() => handleOpenExpand(brand?.value)}
                  >
                    <ListItemIcon>{brand?.icon}</ListItemIcon>
                    {/* <ListItemText
                      sx={{
                        "& .css-10hburv-MuiTypography-root": { fontWeight: 600 },
                      }}
                      primary={brand?.value}
                    /> */}
                  </ListItemButton>
                ))}
              </Collapse>
            </>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default CollapseFilter;
