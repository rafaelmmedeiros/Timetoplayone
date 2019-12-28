import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IEstudo } from '../models/estudo';
import { NavBar } from '../../features/nav/NavBar';
import { EstudoDashboard } from '../../features/estudos/EstudoDashboard';

const App = () => {
  const [estudos, setEstudos] = useState<IEstudo[]>([])

  useEffect(() => {
    axios
      .get<IEstudo[]>('http://localhost:5000/api/estudos')
      .then((response) => {
        setEstudos(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <EstudoDashboard 
          estudos={estudos}  
        />
      </Container>
    </Fragment>
  );
}
export default App;
