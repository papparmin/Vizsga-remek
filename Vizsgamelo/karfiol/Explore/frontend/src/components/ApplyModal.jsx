import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ApplyModal = ({ open, handleClose, tourName }) => {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        sx: { 
          borderRadius: 5, 
          p: 2, 
          background: 'rgba(255,255,255,0.95)', // Világos téma a kitöltéshez, hogy olvasható legyen
          color: '#111' 
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 800 }}>
        Jelentkezés: {tourName}
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 3, color: 'gray' }}>
          Kérjük, add meg az adataidat, és hamarosan felvesszük veled a kapcsolatot.
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Teljes név" fullWidth variant="outlined" />
          <TextField label="Email cím" type="email" fullWidth variant="outlined" />
          <TextField label="Telefonszám" fullWidth variant="outlined" />
          <TextField label="Megjegyzés (allergia, tapasztalat)" multiline rows={3} fullWidth variant="outlined" />
          <Button variant="contained" size="large" sx={{ mt: 2, borderRadius: 10, py: 1.5, fontWeight: 900 }}>
            Küldés
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;