import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    render(){
        const { palettes } = this.props;
        return(
            <div>
                <h1>Your Palettes</h1>
                { palettes.map(palette => {
                    return(
                        <MiniPalette {...palette} />
                    )
                })}
            </div>
        )
    }
}
export default PaletteList;