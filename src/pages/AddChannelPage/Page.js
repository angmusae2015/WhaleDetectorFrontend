import React, { useState, createContext, useContext, useMemo } from "react";

import { Box } from '@mui/material';

import { AccordionMenu, AccordionPanel, ChannelLinkInputPanelContent, ChannelNameInputPanelContent } from "layouts/Accordion";

import PostButton from "./PostButton";

// PostButton 컴포넌트에 채널 정보를 전달하는 컨텍스트
export const channelInfoContext = createContext();

function AddChannelPage() {
  // 설정한 채널 ID 및 이름 상태 초기화
  const [channelId, setChannelId] = useState(null);
  const [channelName, setChannelName] = useState(null);

  // channelInfoContext에 사용할 값
  const channelInfo = useMemo(() => ({
    channelId, channelName
  }), [channelId, channelName]);

  return (
    <div>
      <AccordionMenu id='add-channel-accordion-menu'>
        <AccordionPanel title='채널 이름'>
          <ChannelNameInputPanelContent setValue={setChannelName} />
        </AccordionPanel>
        <AccordionPanel title='채널 ID 찾기'>
          <ChannelLinkInputPanelContent setValue={setChannelId} />
        </AccordionPanel>
      </AccordionMenu>
      <channelInfoContext.Provider value={channelInfo}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse'
          }} >
          <PostButton />
        </Box>
      </channelInfoContext.Provider>
    </div>
  );
}

export default AddChannelPage;