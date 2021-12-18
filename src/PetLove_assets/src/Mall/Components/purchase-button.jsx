import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import GreenButton from '../../components/green-button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserContext from "../../Contexts/user-context";
import { Principal } from '@dfinity/principal';
import {PetLove} from "../../../../declarations/PetLove";
import ModalStyle from "./modal-style";

const style = ModalStyle;

class PurchaseButton extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      isOpenConfirm: false,
      isOpenEnterPartner: false,
      isOpenPurchaseResult: false,
      isPurchaseSuccessful: false,
      txtPartnerAddress: ""
    }
  }

  handleOpenConfirm = () => this.setState({
    isOpenConfirm: true, 
    isOpenEnterPartner: false,
    isOpenPurchaseResult: false,
    isPurchaseSuccessful: false,
    txtPartnerAddress: ""
  });

  handleCloseConfirm = () => this.setState({isOpenConfirm: false});

  handleOpenEnterPartner = () => {
    this.setState({
      isOpenConfirm: false,
      isOpenEnterPartner: true
    })
  };

  handleCloseEnterPartner = () => this.setState({isOpenEnterPartner: false});

  handleTextFieldChange = (event) => {
    this.setState({txtPartnerAddress: event.target.value});
  };

  handleSubmitPartnerAddress = async () => {
    this.setState({
      isPurchaseSuccessful: await this.validatePurchase(),
      isOpenPurchaseResult: true,
      isOpenEnterPartner: false
    })
    this.setState({txtPartnerAddress: ""});
  };

  // TODO: validate user balance and partner address
  validatePurchase = async () => {
    const { user } = this.context;

    console.log(user);
    console.log(user.principal);

    if(user == null || user.principal == null || user.chosenPet == null) return false;

    let mateAddress = this.state.txtPartnerAddress;
    let matePrincipal = "";
    try {
      matePrincipal = Principal.fromText(mateAddress);
    } catch(err) {
      console.log("Failed to convert mateAddress: ", mateAddress);
      return false;
    }

    console.log("mate: ", matePrincipal);
    console.log("chosenPet: ", user.chosenPet);

    const success = await user.backendActor.purchasePet(matePrincipal, user.chosenPet.id);

    console.log("purchase success: ", success);

    if(success === true) {
      console.log("purchase success.")
      const profile = await user.backendActor.getUserProfile();
      console.log(profile);
      return true;
    }

    console.log("purchase failed.");
    return false;
  };

  handleClosePurchaseResult = () => this.setState({
    isOpenConfirm: false, 
    isOpenEnterPartner: false,
    isOpenPurchaseResult: false,
    isPurchaseSuccessful: false,
    txtPartnerAddress: ""
  });
  
  render() {
    return (
      <div>
        <GreenButton startIcon={<FavoriteIcon />} onClick={this.handleOpenConfirm}>{this.props.label}</GreenButton>
        <Modal
          open={this.state.isOpenConfirm}
          onClose={this.handleCloseConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} direciton="row" alignItems="center">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                If your confirm the purchase, we will initiate a transfer, and you will immediately own the pet.
              </Typography>
              <Stack direction="row" mt={3} spacing={2} alignItems="center">
                <GreenButton onClick={this.handleOpenEnterPartner}>Yes, buy it!</GreenButton>
                <GreenButton onClick={this.handleCloseConfirm}>Wait</GreenButton>
              </Stack>
          </Stack>
        </Modal>
        <Modal
          open={this.state.isOpenEnterPartner}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} spacing={2} direciton="row" alignItems="center">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter your partner's wallet address, you will have your only love pet.
            </Typography>
            &nbsp;
            <TextField
                size="small"
                required
                fullWidth
                id="outlined-required"
                onChange={this.handleTextFieldChange}
              />
            <Stack direction="row" spacing={2} alignItems="center">
              <GreenButton onClick={this.handleSubmitPartnerAddress}>Yes, buy it!</GreenButton>
              <GreenButton onClick={this.handleCloseEnterPartner}>Cancel</GreenButton>
            </Stack>
          </Stack>
        </Modal>
        <Modal
          open={this.state.isOpenPurchaseResult}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} direciton="row" alignItems="center">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {this.state.isPurchaseSuccessful ? 
                "You have successfully adopted the pet! Go to the personal center to check it out." 
                : "Failed to adopt, please check the wallet address again. Probably you already have a pet with your partner or your balance is not enough."}
              </Typography>
              &nbsp;
              <Stack direction="row" spacing={2} alignItems="center">
                <GreenButton onClick={this.handleClosePurchaseResult}>OK</GreenButton>
              </Stack>
          </Stack>
        </Modal>
      </div>
    );
  }
}

export default PurchaseButton;
