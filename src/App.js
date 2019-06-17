import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColours from './seedColours';
import { generatePalette } from './colourHelpers';

class App extends Component {
  findPalette(id){
    return seedColours.find(function(palette){
      return palette.id === id;
    })
  }

  render() {
    return (
      <Switch>
        <Route 
          exact 
          path='/palette/:paletteId/:colorId' 
          render={routeProps => (
            <SingleColorPalette 
              colorId={ routeProps.match.params.colorId }
              palette={ generatePalette( this.findPalette( routeProps.match.params.paletteId ))} 
            />
          )}   
        />

        <Route 
          exact 
          path='/' 
          render={ (routeProps) => (
            <PaletteList palettes={ seedColours } { ...routeProps } /> 
          )}
        />

        <Route
          exact 
          path='/palette/:id' 
          render={ routeProps => (
            <Palette palette={ generatePalette( this.findPalette( routeProps.match.params.id ))} />
          )} 
        />
      </Switch>
      /* <div>
        <Palette palette={generatePalette(seedColours[1])}/>
      </div> */
    );
  }
}

export default App;
