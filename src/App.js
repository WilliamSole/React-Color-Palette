import React, { Component } from 'react';
import Palette from './Palette';
import seedColours from './seedColours';
import { generatePalette } from './colourHelpers';

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColours[3])}/>
      </div>
    );
  }
}

export default App;
