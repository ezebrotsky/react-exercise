import './App.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from './components/card';

function App() {
  return (
    <div className="App">
      <Grid item xs sm md lg>
      <Card 
        id="1"
        title="Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro"
        location="Juan Francisco Seguí 3900, Palermo Chico, Pal..."
        description="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de
        texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el
        año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)"
        price="1400000"
        m2="380"
        dorms="3"
        bath="2"
        garage="2"
        images={['/static/images/dfp-venta.jpg','/static/images/images.jpeg',]}
        destacado={true}
      />
      </Grid>
    </div>
  );
}

export default App;
