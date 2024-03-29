import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
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
            stage: 'form',
            newPaletteName: ''
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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

    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette);
        this.setState({ stage: '' })
    }

    render() {
        const { hideForm } = this.props;
        const { newPaletteName, stage } = this.state;
        return (
            <div>
                <Dialog open={ stage === 'emoji' } onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">
                        Choose A Palette Name
                    </DialogTitle>
                    <Picker onSelect={this.savePalette} title='Pick A Palette Emoji' />
                </Dialog>
                <Dialog
                    open={ stage === 'form' }
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
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
            </div>
        );
    }
}

export default PaletteMetaForm;