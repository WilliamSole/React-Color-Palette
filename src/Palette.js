import React, { Component } from 'react';
import ColourBox from './ColourBox';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
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
            <Slider defaultValue={ level } min={ 100 } max={ 900 } step={ 100 } onAfterChange={ this.changeLevel } />
                <div className='Palette-colours'>
                    {colourBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;