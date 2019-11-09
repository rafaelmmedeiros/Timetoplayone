import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import axios from 'axios';
import { IEstudo } from '../models/estudo';
import { NavBar } from '../../features/nav/NavBar';

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
        <List>
          {estudos.map((estudo) => (
            <List.Item key={estudo.id}>{estudo.titulo} {estudo.origem} Idade: {estudo.dificuldade}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
}
export default App;
