import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import { NavBar } from '../../features/nav/NavBar';
import { GrupoDashboard } from '../../features/grupos/GrupoDashboard';
import { IGrupo } from '../models/grupo';

const App = () => {
  const [grupos, setGrupos] = useState<IGrupo[]>([])
  const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | null>(null);
  const [editMode, setEditMode] = useState(false);


  // HANDLERS
  const handleSelectGrupo = (id: string) => {
    setSelectedGrupo(grupos.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedGrupo(null);
    setEditMode(true);
  }

  const handleCreateGrupo = (grupo: IGrupo) => {
    setGrupos([...grupos, grupo]);
    setSelectedGrupo(grupo);
    setEditMode(false);
  }

  const handleEditGrupo = (grupo: IGrupo) => {
    setGrupos([...grupos.filter(a => a.id !== grupo.id), grupo]);
    setSelectedGrupo(grupo);
    setEditMode(false);
  }

  const handleDeleteGrupo = (id: string) => {
    setGrupos([...grupos.filter(a => a.id !== id )]);
  }

  useEffect(() => {
    axios
      .get<IGrupo[]>('http://localhost:5000/api/grupos')
      .then((response) => {
        setGrupos(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar
        openCreateForm={handleOpenCreateForm}
      />
      <Container style={{ marginTop: '7em' }}>
        <GrupoDashboard
          grupos={grupos}
          selectGrupo={handleSelectGrupo}
          selectedGrupo={selectedGrupo}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedGrupo={setSelectedGrupo}
          createGrupo = {handleCreateGrupo}
          editGrupo = {handleEditGrupo}
          deleteGrupo = {handleDeleteGrupo}
        />
      </Container>
    </Fragment>
  );
}
export default App;