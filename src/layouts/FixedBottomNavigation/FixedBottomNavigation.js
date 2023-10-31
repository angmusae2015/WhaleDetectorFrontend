import React from "react";

import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Telegram } from '@mui/icons-material';

function FixedBottomNavigation(props) {
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label='개인 채팅' icon={<Telegram />} />
        <BottomNavigationAction label='채널' icon={<Telegram />} />
      </BottomNavigation>
    </Paper>
  );
}