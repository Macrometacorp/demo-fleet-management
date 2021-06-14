import React, { useState, useEffect } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import ModalTable from './tables/ModalTable';


export default function ModalComponent(props) {
  const { openModal, closeModal } = props;
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(()=>{
    setOpen(openModal.status)
    console.log('modalData', openModal.data);
    setModalData(openModal.data)
  },[openModal.status])

  const handleClose = () => {
    setOpen(false);
    closeModal()
  };
  const { id } = modalData;
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes - {id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ModalTable/>
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}