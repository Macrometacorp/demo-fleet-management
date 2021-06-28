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

export default React.memo(function ModalComponent(props) {
  const { openModal, closeModal, handleSelect } = props;
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({
    status: false,
    data: {},
  });

  useEffect(() => {
    setOpen(openModal.status);
    setModalData(openModal.data);
  }, [openModal.status]);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };

  const handleSelectDate = (data) => {
    setOpen(false);
    closeModal();
    handleSelect({ ...data, _key: modalData._key, data: modalData });
  };
  const { Asset } = modalData;

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
          {Asset}
          <CancelPresentationIcon
            fontSize="large"
            onClick={handleClose}
            style={closeImg}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ModalTable alertData={modalData} handleSelect={(data) => handleSelectDate(data)} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
})
