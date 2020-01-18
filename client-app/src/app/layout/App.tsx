import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import { NavBar } from '../../features/nav/NavBar';
import { GrupoDashboard } from '../../features/grupos/GrupoDashboard';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

const App = () => {
  const [grupos, setGrupos] = useState<IGrupo[]>([])
  const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

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
    setSubmitting(true);
    agent.Grupos.create(grupo).then(() => {
      setGrupos([...grupos, grupo]);
      setSelectedGrupo(grupo);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditGrupo = (grupo: IGrupo) => {
    setSubmitting(true);
    agent.Grupos.update(grupo).then(() => {
      setGrupos([...grupos.filter(a => a.id !== grupo.id), grupo]);
      setSelectedGrupo(grupo);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleDeleteGrupo = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Grupos.delete(id).then(() => {
      setGrupos([...grupos.filter(a => a.id !== id )]);
    }).then(() => setSubmitting(false))
  }

  useEffect(() => {
    agent.Grupos.list()
      .then((response) => {
        setGrupos(response)
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) 
    return <LoadingComponent content='Carregando Grupos de estudos ...' />

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
          submitting = {submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}
export default App;