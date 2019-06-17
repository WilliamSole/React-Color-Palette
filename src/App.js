import React, { Component } from 'react';
import Palette from './Palette';
import seedColours from './seedColours';
import { generatePalette } from './colourHelpers';

class App extends Component {
  render() {
    console.log(generatePalette(seedColours[2]));
    return (
      <div>
        <Palette {...seedColours[1]}/>
      </div>
    );
  }
}

export default App;
