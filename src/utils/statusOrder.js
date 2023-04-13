import { Box } from "@mui/material";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export function statusComfim(status) {
    if(status === 'confirm'){
        return (
            <Box sx={{ color:'#007FFF', display:'flex', alignContent:'center', justifyContent:'space-between'}}><HourglassTopIcon/>{status}</Box>
        )
    }
}