import React, { Component } from 'react';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import './Palette.css';

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
        const { colors, paletteName, emoji } = this.props.palette;
        const { level, format } = this.state;
        const colourBoxes = colors[level].map(c => {
            return <ColourBox key={c.id} background={c[format]} name={c.name} />
        })
        return(
            <div className='Palette'>
                <NavBar level={ level } changeLevel={ this.changeLevel } handleChange={ this.changeColorFormat } />
                <div className='Palette-colours'>
                    {colourBoxes}
                </div>
                <footer className='Palette-footer'>
                    { paletteName }
                    <span className='emoji'>{ emoji }</span>
                </footer>
            </div>
        )
    }
}

export default Palette;