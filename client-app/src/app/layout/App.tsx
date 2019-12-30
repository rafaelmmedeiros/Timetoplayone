import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import { NavBar } from '../../features/nav/NavBar';
import { GrupoDashboard } from '../../features/grupos/GrupoDashboard';
import { IGrupo } from '../models/grupo';

const App = () => {
  const [grupos, setGrupos] = useState<IGrupo[]>([])

  useEffect(() => {
    axios
      .get<IGrupo[]>('http://localhost:5000/api/grupos')
      .then((response) => {
        setGrupos(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <GrupoDashboard 
          grupos={grupos}  
        />
      </Container>
    </Fragment>
  );
}
export default App;