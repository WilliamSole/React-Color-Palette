import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Picker } from 'emoji-mart';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: ''
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        const { handleSubmit, hideForm } = this.props;
        const { newPaletteName } = this.state;
        return (
                <Dialog
                    open={this.state.open}
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                    <Picker />
                        <DialogContentText>
                            Enter a name for you new palette. Make sure it is unique.
                        </DialogContentText>
                            <TextValidator
                                label='Palette Name'
                                name='newPaletteName'
                                value={newPaletteName}
                                onChange={this.handleChange}
                                fullWidth
                                margin='normal'
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter palette name', 'Name is already in use']}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
        );
    }
}

export default PaletteMetaForm;