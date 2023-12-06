import React, { useState } from 'react'
import ApplicationOverviewModal from './ApplicationOverviewModal';
import CommonButtonWithText from './CommonButtonWithText';

const InstructionsButton = ({title}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <CommonButtonWithText 
        onClick={handleOpen}
        title={title}
      />
      <ApplicationOverviewModal 
        open={isOpen} 
        onClose={handleClose} 
      />
    </>
  );
}

export default InstructionsButton