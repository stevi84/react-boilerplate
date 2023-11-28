import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ModalConfirmCancelOwnProps {
  isOpen: boolean;
  headerText: string;
  bodyText: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
}

export const ModalConfirmCancel = (props: ModalConfirmCancelOwnProps) => {
  const { isOpen, headerText, bodyText, confirmButtonText, cancelButtonText, confirmAction, cancelAction } = props;

  const confirm = () => {
    typeof confirmAction === 'function' && confirmAction();
  };
  const cancel = () => {
    typeof cancelAction === 'function' && cancelAction();
  };

  return (
    <Dialog id={'modal-confirm-cancel'} open={isOpen} onClose={cancel}>
      <DialogTitle>{headerText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{bodyText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          id="modal-confirm-cancel-button-confirm"
          variant="contained"
          color="primary"
          onClick={confirm}
          autoFocus={true}
        >
          {confirmButtonText}
        </Button>
        <Button id="modal-confirm-cancel-button-cancel" variant="outlined" color="primary" onClick={cancel}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
