import {
  Box,
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
import Lenovo from "../../../img/lenovo.png";
import Dell from "../../../img/dell.png";
import Asus from "../../../img/asus.png";
import Acer from "../../../img/acer.png";
import Apple from "../../../img/apple.png";
import Samsung from "../../../img/samsung.png";
import Xiaomi from "../../../img/xiaomi.png";
import Huawei from "../../../img/huawei.png";
import Sony from "../../../img/sony.png";
import Canon from "../../../img/canon.png";
import Nikon from "../../../img/nikon.png";
import Fujifilm from "../../../img/fujifilm.png";
import { capitalCase } from "change-case";

function CollapseFilter({ setBrand, setCategory, brand, setPage }) {
  const [open, setOpen] = useState(true);

  const [listCategory, setListCategory] = useState();

  useEffect(() => {
    setListCategory(LISTCATERGORY_OPTIONS);
  }, []);

  const LISTCATERGORY_OPTIONS = [
    {
      id: "0de0daa6-1fe0-4ef0-9644-39e89a5b0618",
      value: "computer",
      icon: <ComputerIcon />,
      open: true,
      brands: [
        {
          id: "aff09f21-acce-402f-a57e-30ef40a70ce8",
          value: "lenovo",
          icon: <img style={{ width: "50px" }} src={Lenovo} alt="lenovo" />,
        },
        {
          id: "e7ef2b42-c64e-47fd-a2fb-998c974f8fb7",
          value: "dell",
          icon: <img style={{ width: "40px" }} src={Dell} alt="dell" />,
        },
        {
          id: "0a549aed-c221-4616-b1a9-bfbb3d43b4b6",
          value: "asus",
          icon: <img style={{ width: "40px" }} src={Asus} alt="asus" />,
        },
        {
          id: "9f04e882-28f0-471a-bd69-0c56f6f0d17c",
          value: "acer",
          icon: <img style={{ width: "40px" }} src={Acer} alt="acer" />,
        },
        {
          id: "9f8d210c-5374-42eb-95cf-58d584e37a52",
          value: "apple",
          icon: <img style={{ width: "40px" }} src={Apple} alt="Apple" />,
        },
      ],
    },
    {
      id: "f83f94d1-781c-4bb0-8c03-2f9a5ba973c6",
      value: "headphone",
      icon: <HeadphonesIcon />,
    },
    {
      id: "17d4afa7-a8f5-481c-9c70-ed11f8ff4401",
      value: "camera",
      icon: <CameraIcon />,
      open: true,
      brands: [
        {
          id: "aff09f21-acce-402f-a57e-30ef40a70ce8",
          value: "canon",
          icon: <img style={{ width: "50px" }} src={Canon} alt="Canon" />,
        },
        {
          id: "e7ef2b42-c64e-47fd-a2fb-998c974f8fb7",
          value: "nikon",
          icon: <img style={{ width: "40px" }} src={Nikon} alt="Nikon" />,
        },
        {
          id: "0a549aed-c221-4616-b1a9-bfbb3d43b4b6",
          value: "fujifilm",
          icon: <img style={{ width: "40px" }} src={Fujifilm} alt="Fujifilm" />,
        },
        {
          id: "9f04e882-28f0-471a-bd69-0c56f6f0d17c",
          value: "sony",
          icon: <img style={{ width: "40px" }} src={Sony} alt="Sony" />,
        },
      ],
    },
    {
      id: "26b9ef55-b980-4da5-afa3-57647f9dc586",
      value: "watch",
      icon: <WatchIcon />,
    },
    {
      id: "e2df4188-47a1-4281-a45c-c516b1aa257c",
      value: "phone",
      icon: <PhoneIphoneIcon />,
      open: true,
      brands: [
        {
          id: "bdeebce0-d953-4ad4-a9f8-c059368d6e76",
          value: "samsung",
          icon: <img style={{ width: "50px" }} src={Samsung} alt="Samsung" />,
        },
        {
          id: "98fe6d6c-5a97-44fe-8d7f-8b4d17993964",
          value: "apple",
          icon: <img style={{ width: "40px" }} src={Apple} alt="apple" />,
        },
        {
          id: "08b2f402-6b9d-4101-be33-8c809394607d",
          value: "xiaomi",
          icon: <img style={{ width: "40px" }} src={Xiaomi} alt="Xiaomi" />,
        },
        {
          id: "f3c79846-faff-4d7b-ad81-98d4880683b0",
          value: "huawei",
          icon: <img style={{ width: "40px" }} src={Huawei} alt="Huawei" />,
        },
        {
          id: "9e93384a-73d3-4a21-a4c9-28bc6f60da40",
          value: "sony",
          icon: <img style={{ width: "40px" }} src={Sony} alt="Sony" />,
        },
      ],
    },
    {
      id: "7b4c1ce8-8b41-4f72-bfae-df81a8f5e81f",
      value: "chair",
      icon: <ChairIcon />,
    },
    {
      id: "608502b2-6c99-43d0-ba89-0a3bd50a4948",
      value: "speaker",
      icon: <SpeakerIcon />,
    },
    {
      id: "489decc6-a0e6-4ea1-8b2d-ce035461b29f",
      value: "otherhouses",
      icon: <OtherHousesIcon />,
    },
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

  const handleFilterBrand = async (category, brand) => {
    setBrand(brand?.value);
    setCategory(category);
    setPage(1);
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
            <Box key={option?.id}>
              {/* collapse parent */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleOpenExpand(option?.value)}
              >
                <ListItemIcon>{option?.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    "& .css-10hburv-MuiTypography-root": { fontWeight: 600 },
                  }}
                  primary={capitalCase(option?.value)}
                />
                {option?.brands &&
                  (option?.open ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {/* collapse chidren */}
              <Collapse in={option?.open} timeout="auto" unmountOnExit>
                {option?.brands?.map((item) => (
                  <ListItemButton
                    key={item?.id}
                    style={{
                      pl: 4,
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor:
                        item.value == brand ? "rgba(0, 0, 0, 0.04)" : "",
                    }}
                    onClick={() =>
                      handleFilterBrand(
                        option?.value == "computer" ? "laptop" : option?.value,
                        item
                      )
                    }
                  >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                  </ListItemButton>
                ))}
              </Collapse>
            </Box>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default CollapseFilter;
