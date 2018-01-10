import React, {Component} from 'react';
import logo from './assets/giphy.gif';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Requester from './Requester'
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql/account' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Requester/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
