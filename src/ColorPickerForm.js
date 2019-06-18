import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const styles = {
    picker: {
        width: '100% !important',
        marginTop: '2rem'
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    colorNameInput: {
        width: '100%',
        height: '70px'
    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: 'teal',
            newColorName: ''
        }

        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    handleColorChange(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' })
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;

        return(
            <div>
                <ChromePicker
                    color={ currentColor }
                    onChangeComplete={ this.handleColorChange }
                    className={ classes.picker }
                />
                <ValidatorForm onSubmit={ this.handleSubmit }>
                    <TextValidator
                        value={ newColorName }
                        className={classes.colorNameInput}
                        name='newColorName'
                        placeholder='Color Name'
                        variant='filled'
                        margin='normal'
                        onChange={ this.handleChange }
                        validators={['required', 'isColorUnique', 'isColorNameUnique']}
                        errorMessages={['Enter a name for the color', 'Color already used', 'Color name must be unique']}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: paletteIsFull ? 'gray' : currentColor }}
                        disabled={paletteIsFull}
                        className={classes.addColor}
                    >
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);