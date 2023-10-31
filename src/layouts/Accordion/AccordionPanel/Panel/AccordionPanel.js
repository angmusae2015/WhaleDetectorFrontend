import React, {useState, useMemo, createContext } from 'react';

import { 
  Accordion, AccordionSummary, AccordionDetails, Typography
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const displayTextContext = createContext();

/**
 * @typedef { Object } AccordionPanelProps
 * @property { number } id
 * @property { string } title
 * @property { boolean } disabled
 * @property { boolean } expanded
 * @property { function } togglePanel
 * @property { function } displayValue
 * @property { React.ReactNode } children
 */

/**
 * @param { AccordionPanelProps } props
 */
function AccordionPanel(props) {
  const {
    id: id,
    title: title,   // 패널 제목으로 표시되는 텍스트
    disabled: disabled,
    expanded: expanded,
    togglePanel: togglePanel,
    children: children // 자식 컴포넌트
  } = props;

  const [displayedText, setDisplayedText] = useState(null);
  const contextValue = useMemo(() => ({setDisplayedText}), [setDisplayedText]);

  return (
    <displayTextContext.Provider value={contextValue}>
      <Accordion
        expanded={expanded}
        onChange={togglePanel}
        disabled={disabled}
      >
        <AccordionSummary
          id={id}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            {title + (expanded || displayedText === null ? "" : `: ${displayedText}`)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </displayTextContext.Provider>
  );
}

AccordionPanel.defaultProps = {
  title: "",
  disabled: false,
  expanded: false,
  togglePanel: (id) => {},
  children: <div />
};

export default AccordionPanel;