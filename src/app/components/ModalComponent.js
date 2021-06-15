import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import ModalTable from "./tables/ModalTable";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

let closeImg = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  width: "50px",
};

export default function ModalComponent(props) {
  const { openModal, closeModal } = props;
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setOpen(openModal.status);
    setModalData(openModal.data);
  }, [openModal.status]);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };
  const { id } = modalData;
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Optional sizes - {id}
          <CancelPresentationIcon
            fontSize="large"
            onClick={handleClose}
            style={closeImg}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ModalTable />
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
