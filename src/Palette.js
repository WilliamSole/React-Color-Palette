import React, { Component } from 'react';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import { withStyles } from '@material-ui/styles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeColorFormat(val) {
        this.setState({ format: val })
    }

    render() {
        const { classes } = this.props;
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colourBoxes = colors[level].map(c => {
            return <ColourBox 
                        key={ c.id } 
                        id={ c.id } 
                        background={ c[format] } 
                        name={ c.name } 
                        paletteId={id} 
                        showFullPalette={ true }
                    />
        })
        return(
            <div className={ classes.Palette }>
                <NavBar 
                    level={ level } 
                    changeLevel={ this.changeLevel } 
                    handleChange={ this.changeColorFormat }
                    showingAllColors={ true }
                />
                <div className={ classes.colors }>
                    {colourBoxes}
                </div>
                <PaletteFooter paletteName={ paletteName } emoji={ emoji } />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);