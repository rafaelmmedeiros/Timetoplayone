import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import GrupoStore from '../stores/grupoStore';
import { observer } from 'mobx-react-lite';
import GrupoDashboard from '../../features/grupos/GrupoDashboard';

const App = () => {

  const grupoStore = useContext(GrupoStore);

  const [grupos, setGrupos] = useState<IGrupo[]>([])
  const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

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
    grupoStore.loadGrupos();
  }, [grupoStore]);

  if (grupoStore.loadingStart) 
    return <LoadingComponent content='Carregando Grupos de estudos ...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <GrupoDashboard
          grupos={grupoStore.grupos}
          setEditMode={setEditMode}
          setSelectedGrupo={setSelectedGrupo}
          editGrupo = {handleEditGrupo}
          deleteGrupo = {handleDeleteGrupo}
          submitting = {submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App)