import React, { Component } from 'react'
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: 'hex'
        }
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter( color => color.id === colorToFilterBy )
            )
        }

        return shades.slice(1);
    }

    changeColorFormat(val) {
        this.setState({ format: val })
    }

    render() {
        const { paletteName, emoji } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColourBox 
                key={ color.id } 
                name={ color.name } 
                background={ color[format] } 
                showLink={ false } 
            />
        ))
        return(
            <div className='Palette'>
            <NavBar handleChange={ this.changeColorFormat } showingAllColors={ false } />
                <h1>Single Color Palette</h1>
                <div className='Palette-colours'>
                    { colorBoxes }
                </div>
                <PaletteFooter 
                    paletteName={ paletteName } 
                    emoji={ emoji } 
                />
            </div>
        )
    }
}

export default SingleColorPalette