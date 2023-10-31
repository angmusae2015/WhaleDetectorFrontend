import React, { useState, Children, cloneElement } from 'react';

/**
 * @typedef { Object } AccordionMenuProps
 * @typedef { string } id
 * @property { React.ReactNode } children
 */

/**
 * @param { AccordionMenuProps } props
 */
function AccordionMenu(props) {
  const { id, children } = props;

  const [expandedPanelId, setExpandedPanelId] = useState(null);

  // 패널을 토글하는 함수
  const togglePanel = (panelId) => {
    if (expandedPanelId === panelId) {
      setExpandedPanelId(null); // 이미 열린 패널을 닫음
    } else {
      setExpandedPanelId(panelId);  // 다른 패널을 열어 현재 패널을 열음
    }
  };

  const renderedChidren = Children.map(children, (child, index) => {
    const panelId = `${id}-panel${index}`;

    return cloneElement(child, {
      id: panelId,
      expanded: expandedPanelId === panelId,
      togglePanel: () => togglePanel(panelId)
    });
  });

  return <div>{renderedChidren}</div>;
}

export default AccordionMenu;