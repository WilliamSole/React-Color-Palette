import React, { Component } from 'react';
import ColourBox from './ColourBox';
import NavBar from './NavBar';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colourBoxes = colors[level].map(c => {
            return <ColourBox key={c.name} background={c.hex} name={c.name} />
        })
        return(
            <div className='Palette'>
                <NavBar level={ level } changeLevel={ this.changeLevel } />
                <div className='Palette-colours'>
                    {colourBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;