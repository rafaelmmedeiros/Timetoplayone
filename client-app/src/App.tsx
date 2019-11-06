import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() { // Quando o componente monta coloca os dois valores dentro do array.
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon
            name='calendar check outline'
          />
          <Header.Content>
            Hora de Tocar
              <Header.Subheader>
              Gerenciamento de Estudos
              </Header.Subheader>
          </Header.Content>
        </Header>

        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.nome} {value.sobrenome} Idade: {value.idade}</List.Item>
          ))}
        </List>

      </div>
    );
  }
}

export default App;
