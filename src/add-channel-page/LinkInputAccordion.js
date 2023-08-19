import React, { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TextField from '@mui/material/TextField';

/**
 * @typedef { Object } AccordionProps
 * @property { Object } accordionProps
 * @property { function(number) } setChannelID
 */

/**
 * @param { AccordionProps } props
 */
function LinkInputAccordion(props) {
  const { accordionProps, setChannelID } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
    >
      <Typography>
        {"채널 ID 찾기"}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <NameInput setName={setName} />
    </AccordionDetails>
    </Accordion>
  )
}