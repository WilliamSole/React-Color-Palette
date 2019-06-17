import React from 'react';
import Palette from './Palette';
import seedColours from './seedColours';

function App() {
  return (
    <div>
      <Palette {...seedColours[4]}/>
    </div>
  );
}

export default App;
