import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import { withStyles } from '@material-ui/styles';


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
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColourBox 
                key={ color.name } 
                name={ color.name } 
                background={ color[format] } 
                showFullPalette={ false } 
            />
        ))
        return(
            <div className={ classes.Palette }>
            <NavBar handleChange={ this.changeColorFormat } showingAllColors={ false } />
                <div className={ classes.colors }>
                    { colorBoxes }
                    <div className={ classes.goBack }> 
                        <Link to={`/palette/${ id }`}>go back</Link>
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={ paletteName } 
                    emoji={ emoji } 
                />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);