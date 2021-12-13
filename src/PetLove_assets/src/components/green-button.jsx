import React from 'react';
import Button from '@mui/material/Button';

// reference: https://stackoverflow.com/questions/20851533/react-js-wrapping-one-component-into-another

const greenButtonWraperHOC = (Button) => {
    class Wrapper extends React.PureComponent {
        render() {
            return (
                <Button
                    {...this.props}
                    sx={{ my: 2, 
                    color: 'white', 
                    backgroundColor: 'rgba(33,182,174,1.0)',
                    '&:hover': {
                        backgroundColor: 'rgba(33,182,174,0.5)'
                    }}}
                    >
                </Button>
            );
        }
    };
    return Wrapper;
};

const GreenButton = greenButtonWraperHOC(Button);

export default GreenButton;