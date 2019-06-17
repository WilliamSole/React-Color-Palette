import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    render(){
        const { palettes } = this.props;
        return(
            <div>
                <h1>Your Palettes</h1>
                { palettes.map(palette => {
                    return(
                        <p>
                            <Link exact to={`/palette/${ palette.id }`}>{ palette.paletteName }</Link>
                        </p>
                    )
                })}
            </div>
        )
    }
}
export default PaletteList;