import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colourHelpers';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

import seedColours from './seedColours';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColours
    }

    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette( id ) {
    return this.state.palettes.find( function ( palette ) {
      return palette.id === id;
    })
  }

  savePalette( newPalette ) {
    this.setState({ palettes: [ ...this.state.palettes, newPalette ]}, this.syncLocalStorage)
  }

  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  deletePalette(id) {
    this.setState(state => ({
      palettes: state.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={ routeProps => (
            <NewPaletteForm 
              savePalette={ this.savePalette }
              palettes={ this.state.palettes }  
              { ...routeProps }
            /> 
          )} 
        />

        <Route 
          exact 
          path='/palette/:paletteId/:colorId' 
          render={ routeProps => (
            <SingleColorPalette 
              colorId={ routeProps.match.params.colorId }
              palette={ generatePalette( this.findPalette( routeProps.match.params.paletteId ))} 
            />
          )}   
        />

        <Route 
          exact 
          path='/' 
          render={ routeProps => (
            <PaletteList 
              palettes={ this.state.palettes } 
              deletePalette={this.deletePalette} 
              { ...routeProps } 
            /> 
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
