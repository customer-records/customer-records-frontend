import { useState } from 'react';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export default function Accordion({ title, children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        mb: 2,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 -1px 2px rgba(0,0,0,0.05)',
        userSelect: 'none', 
      }}
      onCopy={handleCopy}
      onCut={handleCopy}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
          bgcolor: 'background.paper',
          '&:hover': { 
            bgcolor: 'action.hover',
          },
        }}
        onClick={toggleAccordion}
      >
        <Typography 
          variant="subtitle1" 
          fontWeight="medium"
          color="text.primary"
          sx={{
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          {title}
        </Typography>
        <IconButton 
          size="small" 
          disableRipple
          sx={{
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          {isOpen ? (
            <CloseIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
      
      <Collapse in={isOpen}>
        <Box 
          component="div"
          p={1}
          onCopy={handleCopy}
          onCut={handleCopy}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}