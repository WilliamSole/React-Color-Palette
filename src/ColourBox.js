import React, { Component } from 'react'
import './ColourBox.css';

class ColourBox extends Component {
    render() {
        return(
            <div className='ColourBox' style={{ background: this.props.background }}>
                <span>{this.props.name}</span>
                <span>MORE!</span>
            </div>
        )
    }
}

export default ColourBox;