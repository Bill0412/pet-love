import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import GreenButton from '../../components/green-button';
import FavoriteIcon from '@mui/icons-material/Favorite';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const PurchaseButton = (props) => {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const [openEnterPartner, setOpenEnterPartner] = React.useState(false);
  const handleOpenEnterParter = () => {
    setOpenEnterPartner(true);
    setOpenConfirm(false);
  }
  const handleCloseEnterPartner = () => setOpenEnterPartner(false);

  const handleTextFiledChange = () => {

  }

  return (
    <div>
      <GreenButton startIcon={<FavoriteIcon />} onClick={handleOpenConfirm}>{props.label}</GreenButton>
      <Modal
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} direciton="row" alignItems="center">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              If your confirm the purchase, we will initiate a transfer, and you will immediately own the pet.
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <GreenButton onClick={handleOpenEnterParter}>Yes, buy it!</GreenButton>
              <GreenButton onClick={handleCloseConfirm}>Wait</GreenButton>
            </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openEnterPartner}
        onClose={handleCloseEnterPartner}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} spacing={2} direciton="row" alignItems="center">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter your partner's wallet address, you will have your only love pet.
          </Typography>
          <TextField
              size="small"
              required
              fullWidth
              id="outlined-required"
              onChange={handleTextFiledChange}
            />
          <Stack direction="row" spacing={2} alignItems="center">
            <GreenButton>Yes, buy it!</GreenButton>
            <GreenButton onClick={handleCloseEnterPartner}>Cancel</GreenButton>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
};

export default PurchaseButton;
