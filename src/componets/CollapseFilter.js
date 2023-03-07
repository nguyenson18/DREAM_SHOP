import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CategoryIcon from "@mui/icons-material/Category";
import ComputerIcon from "@mui/icons-material/Computer";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CameraIcon from "@mui/icons-material/Camera";
import WatchIcon from "@mui/icons-material/Watch";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ChairIcon from "@mui/icons-material/Chair";
import SpeakerIcon from "@mui/icons-material/Speaker";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import React, { useState } from "react";

function CollapseFilter() {
  const [open, setOpen] = useState(true);
  const LISTCATERGORY_OPTIONS = [
    { value: "Computer", icon: <ComputerIcon /> },
    { value: "Headphone", icon: <HeadphonesIcon /> },
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
          {LISTCATERGORY_OPTIONS.map((option) => (
            <ListItemButton key={option?.value} sx={{ pl: 4 }}>
              <ListItemIcon>{option?.icon}</ListItemIcon>
              <Typography sx={{ fontWeight: 600 }}>{option?.value}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default CollapseFilter;
