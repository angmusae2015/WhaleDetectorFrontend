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
 * @property { string } name
 * @property { function(string) } setName
 */

/**
 * @param { AccordionProps } props
 */
function NameInputAccordion(props) {
  const { accordionProps, name, setName } = props;

  return (
    <Accordion {...accordionProps}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
    >
      <Typography>
        {"채널 이름" + (!accordionProps.expanded && (name !== "") ? `: ${name}` : "")}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <NameInput setName={setName} />
    </AccordionDetails>
    </Accordion>
  )
}

NameInputAccordion.defaultProps = {
  accordionProps: {}
};

/**
 * @typedef { Object } InputProps
 * @property { Object } inputProps
 * @property { function(string) } setName
 */

/**
 * @param { InputProps } props 
 */
function NameInput(props) {
  // props에서 필요한 변수들을 추출
  const { inputProps, setName } = props;

  return (
    <div>
      <TextField
        inputProps={inputProps}
        label={"채널 이름"}
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></TextField>
    </div>
  );
}

NameInput.defaultProps = {
  inputProps: {}
};

export default NameInputAccordion;