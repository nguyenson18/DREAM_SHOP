import { Box } from "@mui/material";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export function statusComfim(status) {
    if(status === 'confirm'){
        return (
            <Box sx={{ color:'#007FFF', display:'flex', alignContent:'center', justifyContent:'space-between'}}><HourglassTopIcon/>{status}</Box>
        )
    }
    if(status ==='done'){
        return (
            <Box sx={{ color:'rgb(46, 125, 50)', display:'flex', alignContent:'center', justifyContent:'space-between'}}><TaskAltIcon/>{status}</Box>
        )
    }
}