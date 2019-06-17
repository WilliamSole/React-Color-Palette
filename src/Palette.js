import React, { Component } from 'react';
import ColourBox from './ColourBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colourBoxes = this.props.colors.map(c => {
            return <ColourBox key={c.name} background={c.color} name={c.name} />
        })
        return(
            <div className='Palette'>
                <div className='Palette-colours'>
                    {colourBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;